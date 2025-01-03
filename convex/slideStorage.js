import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const addSlideEntryToDatabase = mutation({
  args: {
    slideId: v.string(),
    storageId: v.string(),
    slideName: v.string(),
    createdBy: v.string(), // User Email
    slideUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("slides", {
      slideId: args.slideId,
      storageId: args.storageId,
      slideName: args.slideName,
      createdBy: args.createdBy,
      slideUrl: args.slideUrl,
    });

    return "Slide added successfully!";
  },
});

export const getSlideUrl = mutation({
  args: {
    storageId: v.string()
  },
  handler: async (ctx, args) => {
    const slideUrl = await ctx.storage.getUrl(args.storageId);
    return slideUrl;
  },
});

export const getSlideRecord = query({
  args: {
    slideId: v.string()
  },
  handler: async(ctx, args) => {
    const result = await ctx.db
      .query("slides")
      .filter((q) => q.eq(q.field("slideId"), args.slideId))
      .collect();
    console.log('getSlideRecord', result[0]);
    return result[0];
  },
});
