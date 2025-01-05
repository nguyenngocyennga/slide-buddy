// ------------------------ User Management -------------------------------------
// This file contains the Convex mutation for user management. 
// It ensures users are added to the database if they do not already exist.

import { v } from "convex/values";
import { mutation } from "./_generated/server";

// ------------------------ Mutation: Create User ------------------------------
// This mutation handles user creation. If a user with the given email does not exist,
// it creates a new user in the "users" table. Otherwise, it returns a message indicating
// the user already exists.
export const createUser=mutation({
    args: {
        email:v.string(),
        userName:v.string(),
        imageUrl:v.string(),
    },
    handler: async(ctx, args) => {
        // Query the database to check if a user with the given email already exists.
        const user = await ctx.db.query('users').filter((q)=>q.eq(q.field('email'), args.email)).collect();
        
        // If the user does not exist, create a new user record in the database.
        if(user?.length == 0) {
            await ctx.db.insert('users', {
                email: args.email,
                userName: args.userName,
                imageUrl: args.imageUrl,
            });

            return 'User created successfully';
        }
        
        // If the user already exists, return a corresponding message.
        return 'User already exist';

    }
})