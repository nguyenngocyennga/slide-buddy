// ------------------------ LangChain Convex Actions ----------------------------------
// This module defines two Convex actions (`ingest` and `search`) that interact with
// LangChain's Convex Vector Store. These actions enable storing embeddings for documents
// and performing similarity-based search queries.

import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

// Google API Key for Generative AI access
const apiKey = process.env.GOOGLE_API_KEY;

// ------------------------ Ingest Action ---------------------------------------------
// This action stores text embeddings into a Convex Vector Store for later retrieval.
// It processes input text (`splitText`) and associates it with metadata like `slideId`, `slideName`, and `createdBy`.

export const ingest = action({
  args: {
    splitText: v.any(), 
    slideId: v.string(),
    slideName: v.string(), // new schema
    createdBy: v.string(), // new schema
  },
  handler: async (ctx, args) => {
    // Store text embeddings using the Convex Vector Store
    await ConvexVectorStore.fromTexts(
        args.splitText,
        {
          slideId: args.slideId,
          slideName: args.slideName,
          createdBy: args.createdBy,
        },
        new GoogleGenerativeAIEmbeddings({
            apiKey: apiKey,
            model: "text-embedding-004", // 768 dimensions
            taskType: TaskType.RETRIEVAL_DOCUMENT,
            title: "Document title",
        }),
        { ctx } // Convex context for database interaction

    );
    return "Action completed"
  },
});

// ------------------------ Search Action ---------------------------------------------
// This action performs a similarity search on the Convex Vector Store. 
// It retrieves embeddings similar to the query text within the context of a specific slide.

export const search = action({
  args: {
    query: v.string(),
    slideId: v.string(),
  },
  handler: async (ctx, args) => {
    // Initialize the vector store with Google Generative AI embeddings
    const vectorStore = new ConvexVectorStore(
      // new OpenAIEmbeddings(), 
      new GoogleGenerativeAIEmbeddings({
        apiKey: apiKey,
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
      }),
      { ctx }
    );

    // Perform a similarity search and filter results by the given slide ID
    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(
      (q) => q.metadata.slideId === args.slideId
    );
    // console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});
