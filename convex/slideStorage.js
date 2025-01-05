// ------------------------ Slide Management ------------------------------------
// This file contains the Convex server logic for managing lecture slides.
// It includes mutations for generating upload URLs, adding slide records to the database,
// retrieving slide URLs, and querying slide data for users or individual slides.

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ------------------------ Mutation: Generate Upload URL ----------------------
// Generates a short-lived upload URL for securely uploading files to storage.
export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

// ------------------------ Mutation: Add Slide Entry to Database --------------
// Adds a new slide record to the "slides" table in the database.
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

// ------------------------ Mutation: Get Slide URL ----------------------------
// Retrieves the storage URL for a given storage ID.
export const getSlideUrl = mutation({
  args: {
    storageId: v.string()
  },
  handler: async (ctx, args) => {
    const slideUrl = await ctx.storage.getUrl(args.storageId);
    return slideUrl;
  },
});

// ------------------------ Query: Get Slide Record ----------------------------
// Retrieves a specific slide record from the "slides" table by slide ID.
export const getSlideRecord = query({
  args: {
    slideId: v.string()
  },
  handler: async(ctx, args) => {
    const result = await ctx.db
      .query("slides")
      .filter((q) => q.eq(q.field("slideId"), args.slideId))
      .collect();
    // console.log('getSlideRecord', result[0]);
    return result[0];
  },
});

// ------------------------ Query: Get User's Slides ---------------------------
// Retrieves all slides created by a specific user.
export const getUserSlides = query({
  args: {
    createdBy: v.string()
  },
  handler: async(ctx, args) => {
    const result = await ctx.db.query("slides").filter((q) => q.eq(q.field("createdBy"), args.createdBy)).collect();
    return result;
  }
})
