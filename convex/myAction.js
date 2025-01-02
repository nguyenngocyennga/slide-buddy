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

  },
  handler: async (ctx, args) => {
    await ConvexVectorStore.fromTexts(
        args.splitText,
        args.slideId,
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
