import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '@/server/api/trpc';

export const notesRouter = createTRPCRouter({
  getAllNotes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.notes.findMany();
  }),
  completeNote: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.notes.update({
      where: { id: input.id },
      data: { completed: true },
    });
  }),
  unCompleteNote: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.notes.update({
      where: { id: input.id },
      data: { completed: false },
    });
  }),
  deleteNote: publicProcedure.input(z.object({ id: z.string() })).mutation(({ ctx, input }) => {
    return ctx.prisma.notes.delete({
      where: { id: input.id },
    });
  }),
});
