import { desc, eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, files, InsertFileRecord, FileRecord } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// ── File Storage Queries ──

export async function createFileRecord(file: InsertFileRecord): Promise<FileRecord | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot create file record: database not available");
    return undefined;
  }

  await db.insert(files).values(file);
  // Return the inserted record
  const result = await db
    .select()
    .from(files)
    .where(eq(files.fileKey, file.fileKey as string))
    .limit(1);
  return result[0];
}

export async function getFilesByUser(userId: number): Promise<FileRecord[]> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get files: database not available");
    return [];
  }

  return db
    .select()
    .from(files)
    .where(eq(files.userId, userId))
    .orderBy(desc(files.createdAt));
}

export async function getFileById(fileId: number): Promise<FileRecord | undefined> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get file: database not available");
    return undefined;
  }

  const result = await db.select().from(files).where(eq(files.id, fileId)).limit(1);
  return result[0];
}

export async function deleteFileRecord(fileId: number, userId: number): Promise<boolean> {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot delete file: database not available");
    return false;
  }

  // Only allow deletion if the file belongs to the user
  const file = await getFileById(fileId);
  if (!file || file.userId !== userId) return false;

  await db.delete(files).where(eq(files.id, fileId));
  return true;
}
