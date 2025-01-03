import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { action } from "./_generated/server.js";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { v } from "convex/values";

const apiKey = process.env.GOOGLE_API_KEY;

export const ingest = action({
  args: {
    splitText: v.any(),
    slideId: v.string(),
    slideName: v.string(), // new schema
    createdBy: v.string(), // new schema
  },
  handler: async (ctx, args) => {
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
        { ctx }

    );
    return "Action completed"
  },
});

export const search = action({
  args: {
    query: v.string(),
    slideId: v.string(),
  },
  handler: async (ctx, args) => {
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

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(
      (q) => q.metadata.slideId === args.slideId
    );
    console.log(resultOne);

    return JSON.stringify(resultOne);
  },
});
