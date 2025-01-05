// ------------------------ Convex Schema Definition ---------------------------
// This file defines the schema for the Convex database used in the Slide Buddy project.
// The schema includes tables for users, slides, documents, and notes, along with field definitions and indexing.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

// ------------------------ Schema Definition ----------------------------------
// Define the schema for the Convex database tables.
export default defineSchema({
    // ------------------------ Users Table --------------------------------------
    users: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }),

    // ------------------------ Slides Table -------------------------------------
    slides: defineTable({
        slideId: v.string(),
        storageId: v.string(),
        slideName: v.string(),
        slideUrl: v.string(),
        createdBy: v.string(),
    }),
    
    // ------------------------ Documents Table ----------------------------------
    documents: defineTable({
        embedding: v.array(v.number()),
        text: v.string(),
        metadata: v.object({
            slideId: v.string(),
            slideName: v.string(),
            createdBy: v.string(),
        }),
    }).vectorIndex("byEmbedding", {
        vectorField: "embedding",
        dimensions: 768,
    }),

    // ------------------------ Notes Table --------------------------------------
    notes: defineTable({
        slideId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    }),
});
