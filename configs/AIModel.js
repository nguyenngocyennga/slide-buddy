// ------------------------ Google Generative AI Configuration ------------------------
// This script sets up and configures the Google Generative AI client (Gemini model)
// for generating text. It defines the API key, model, and generation configuration.
// It also initializes a chat session for conversational AI tasks.

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
// ------------------------ API Key Initialization ------------------------------------
// The API key is fetched from the environment variables for secure access.
const apiKey = process.env.GOOGLE_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

// ------------------------ Model Configuration ---------------------------------------
// Specify the generative model to be used for text generation.
// "gemini-1.5-flash" is a specific model name chosen for high-quality responses.
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

// ------------------------ Generation Settings ---------------------------------------
// Define the configuration for text generation, such as temperature, token limits, etc.
const generationConfig = {
  temperature: 1, // Controls the randomness of the output (higher = more random)
  topP: 0.95, // Controls the diversity of the output (higher = more diverse)
  topK: 40, // Controls the diversity of the output (higher = more diverse)
  maxOutputTokens: 8192, // Maximum number of tokens to generate
  responseMimeType: "text/plain", // Format of the response
};

// ------------------------ Chat Session Initialization -------------------------------
// Create a conversational chat session using the model and the generation configuration.
export const chatSession = model.startChat({
    generationConfig, // Apply the defined generation settings
    history: [], // Chat history (if any)
});

// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());