import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Files table for tracking uploaded files.
 * Stores metadata and S3 references for user-uploaded content.
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  /** The user who uploaded this file */
  userId: int("userId").notNull(),
  /** Original filename as uploaded by the user */
  filename: varchar("filename", { length: 512 }).notNull(),
  /** MIME type of the file */
  mimeType: varchar("mimeType", { length: 128 }).notNull(),
  /** File size in bytes */
  size: int("size").notNull(),
  /** S3 storage key returned by storagePut */
  fileKey: text("fileKey").notNull(),
  /** URL path to access the file (e.g. /manus-storage/...) */
  url: text("url").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type FileRecord = typeof files.$inferSelect;
export type InsertFileRecord = typeof files.$inferInsert;