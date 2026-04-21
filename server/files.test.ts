import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the storage module
vi.mock("./storage", () => ({
  storagePut: vi.fn().mockResolvedValue({
    key: "1-files/test-file_abc12345.png",
    url: "/manus-storage/1-files/test-file_abc12345.png",
  }),
}));

// Mock the db module
vi.mock("./db", async (importOriginal) => {
  const original = await importOriginal<typeof import("./db")>();

  const mockFiles: any[] = [];
  let nextId = 1;

  return {
    ...original,
    createFileRecord: vi.fn().mockImplementation(async (file: any) => {
      const record = { ...file, id: nextId++, createdAt: new Date() };
      mockFiles.push(record);
      return record;
    }),
    getFilesByUser: vi.fn().mockImplementation(async (userId: number) => {
      return mockFiles.filter((f) => f.userId === userId);
    }),
    getFileById: vi.fn().mockImplementation(async (fileId: number) => {
      return mockFiles.find((f) => f.id === fileId) ?? undefined;
    }),
    deleteFileRecord: vi.fn().mockImplementation(async (fileId: number, userId: number) => {
      const idx = mockFiles.findIndex((f) => f.id === fileId && f.userId === userId);
      if (idx === -1) return false;
      mockFiles.splice(idx, 1);
      return true;
    }),
  };
});

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId = 1): TrpcContext {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createUnauthContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("files router", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("files.upload", () => {
    it("uploads a file and returns the record", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.upload({
        filename: "test-file.png",
        mimeType: "image/png",
        size: 1024,
        base64Data: Buffer.from("fake image data").toString("base64"),
      });

      expect(result).toBeDefined();
      expect(result?.filename).toBe("test-file.png");
      expect(result?.mimeType).toBe("image/png");
      expect(result?.size).toBe(1024);
      expect(result?.userId).toBe(1);
      expect(result?.fileKey).toBeDefined();
      expect(result?.url).toBeDefined();
    });

    it("rejects unauthenticated upload", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "test.png",
          mimeType: "image/png",
          size: 1024,
          base64Data: "dGVzdA==",
        })
      ).rejects.toThrow();
    });

    it("rejects files exceeding 16MB", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "huge.bin",
          mimeType: "application/octet-stream",
          size: 17 * 1024 * 1024, // 17MB
          base64Data: "dGVzdA==",
        })
      ).rejects.toThrow();
    });

    it("rejects empty filename", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      await expect(
        caller.files.upload({
          filename: "",
          mimeType: "image/png",
          size: 1024,
          base64Data: "dGVzdA==",
        })
      ).rejects.toThrow();
    });
  });

  describe("files.list", () => {
    it("returns files for authenticated user", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      const result = await caller.files.list();
      expect(Array.isArray(result)).toBe(true);
    });

    it("rejects unauthenticated list", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.list()).rejects.toThrow();
    });
  });

  describe("files.get", () => {
    it("rejects unauthenticated get", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.get({ id: 1 })).rejects.toThrow();
    });
  });

  describe("files.delete", () => {
    it("rejects unauthenticated delete", async () => {
      const ctx = createUnauthContext();
      const caller = appRouter.createCaller(ctx);

      await expect(caller.files.delete({ id: 1 })).rejects.toThrow();
    });

    it("deletes a file for authenticated user", async () => {
      const ctx = createAuthContext(1);
      const caller = appRouter.createCaller(ctx);

      // First upload a file
      const uploaded = await caller.files.upload({
        filename: "to-delete.txt",
        mimeType: "text/plain",
        size: 100,
        base64Data: Buffer.from("delete me").toString("base64"),
      });

      expect(uploaded).toBeDefined();

      // Then delete it
      const result = await caller.files.delete({ id: uploaded!.id });
      expect(result).toEqual({ success: true });
    });
  });
});
