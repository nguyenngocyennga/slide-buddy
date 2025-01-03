import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        userName: v.string(),
        email: v.string(),
        imageUrl: v.string(),
    }),

    slides: defineTable({
        slideId: v.string(),
        storageId: v.string(),
        slideName: v.string(),
        slideUrl: v.string(),
        createdBy: v.string(),
    }),
    
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
    notes: defineTable({
        slideId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    }),
});
