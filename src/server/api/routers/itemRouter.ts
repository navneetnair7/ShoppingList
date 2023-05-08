import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const itemRouter = createTRPCRouter({
  addItem: publicProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { name } = input;
      const item = await ctx.prisma.shoppinglist.create({
        data: {
          name,
        },
      });
      return item;
    }),

  getItems: publicProcedure.query(async ({ ctx }) => {
    const items = await ctx.prisma.shoppinglist.findMany({});
    return items;
  }),

  deleteItem: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = input;
      const item = await ctx.prisma.shoppinglist.delete({
        where: {
          id,
        },
      });

      return item
    }),
  
  toggleCheck: publicProcedure.input(z.object({ id: z.string(), checked: z.boolean() })).mutation(async ({ input, ctx }) => {
    const { id, checked } = input;
    const item = await ctx.prisma.shoppinglist.update({
      where: {
        id,
      },
      data: {
        checked,
      }
    })
    return item
  })
});