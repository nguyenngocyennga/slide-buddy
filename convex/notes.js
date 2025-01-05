// ------------------------ Notes Management -----------------------------------
// This module provides mutations and queries for managing notes in the Convex database.
// It includes functions to add or update notes and retrieve them by `slideId`.

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// ------------------------ Add or Update Notes --------------------------------
// Mutation to add new notes to the database or update existing ones based on `slideId`.
// If no notes exist for the given `slideId`, a new record is created. Otherwise, the existing record is updated.

export const addNotes = mutation({
    args: {
        slideId: v.string(),
        notes: v.any(),
        createdBy: v.string(),
    },
    handler: async( ctx, args ) => {
        // Query the database to check if notes already exist for the given slideId.
        const record = await ctx.db.query("notes").filter((q) => q.eq(q.field("slideId"), args.slideId)).collect()

        if(record.length == 0) {
            // If no record exists, insert a new one.
            await ctx.db.insert("notes", {
                slideId: args.slideId,
                notes: args.notes,
                createdBy: args.createdBy,
            })
        } else {
            // If a record exists, update the `notes` field.
            await ctx.db.patch(record[0]._id, {
                notes: args.notes
            })
        }
    }
})

// ------------------------ Get Notes ------------------------------------------
// Query to retrieve notes from the database for a specific slide.
// Returns the content of the notes associated with the given `slideId`.

export const getNotes = query({
    args: {
        slideId: v.string(),
    },
    handler: async( ctx, args ) => {
        // Query the database to find notes for the given slideId.
        const result = await ctx.db.query("notes").filter((q) => q.eq(q.field("slideId"), args.slideId)).collect()

        // Return the notes content or `undefined` if no record is found.
        return result[0]?.notes;
    }
})
