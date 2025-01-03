import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addNotes = mutation({
    args: {
        slideId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    },
    handler: async( ctx, args ) => {
        const record = await ctx.db.query("notes").filter((q) => q.eq(q.field("slideId"), args.slideId)).collect()

        if(record.length == 0) {
            await ctx.db.insert("notes", {
                slideId: args.slideId,
                notes: args.notes,
                createdBy: args.createdBy,
            })
        } else {
            await ctx.db.patch(record[0]._id, {
                notes: args.notes
            })
        }
    }
})

export const getNotes = query({
    args: {
        slideId: v.string(),
    },
    handler: async( ctx, args ) => {
        const result = await ctx.db.query("notes").filter((q) => q.eq(q.field("slideId"), args.slideId)).collect()
        return result[0]?.notes;
    }
})