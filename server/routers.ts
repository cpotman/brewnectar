import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { notifyOwner } from "./_core/notification";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createFileRecord, getFilesByUser, getFileById, deleteFileRecord } from "./db";
import { storagePut } from "./storage";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  contact: router({
    /** Submit a contact form message — notifies the site owner */
    submit: publicProcedure
      .input(
        z.object({
          name: z.string().min(1).max(200),
          email: z.string().email().max(320),
          message: z.string().min(1).max(5000),
        })
      )
      .mutation(async ({ input }) => {
        const sent = await notifyOwner({
          title: `New Contact Form: ${input.name}`,
          content: `From: ${input.name} <${input.email}>\n\n${input.message}`,
        });
        if (!sent) {
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Failed to deliver message. Please try again later.",
          });
        }
        return { success: true };
      }),
  }),

  files: router({
    /** List all files uploaded by the current user */
    list: protectedProcedure.query(async ({ ctx }) => {
      return getFilesByUser(ctx.user.id);
    }),

    /** Upload a file (base64-encoded content from the client) */
    upload: protectedProcedure
      .input(
        z.object({
          filename: z.string().min(1).max(512),
          mimeType: z.string().min(1).max(128),
          size: z.number().int().positive().max(16 * 1024 * 1024), // 16MB max
          base64Data: z.string(),
        })
      )
      .mutation(async ({ ctx, input }) => {
        // Decode base64 to buffer
        const buffer = Buffer.from(input.base64Data, "base64");

        // Upload to S3 via storage helper
        const fileKey = `${ctx.user.id}-files/${input.filename}`;
        const { key, url } = await storagePut(fileKey, buffer, input.mimeType);

        // Save metadata to database
        const record = await createFileRecord({
          userId: ctx.user.id,
          filename: input.filename,
          mimeType: input.mimeType,
          size: input.size,
          fileKey: key,
          url,
        });

        return record;
      }),

    /** Get a single file by ID (must belong to current user) */
    get: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .query(async ({ ctx, input }) => {
        const file = await getFileById(input.id);
        if (!file || file.userId !== ctx.user.id) {
          return null;
        }
        return file;
      }),

    /** Delete a file (must belong to current user) */
    delete: protectedProcedure
      .input(z.object({ id: z.number().int().positive() }))
      .mutation(async ({ ctx, input }) => {
        const success = await deleteFileRecord(input.id, ctx.user.id);
        return { success };
      }),
  }),
});

export type AppRouter = typeof appRouter;
