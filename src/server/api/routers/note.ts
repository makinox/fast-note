import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const notesRouter = createTRPCRouter({
  getAllNotes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.notes.findMany();
  }),
});
