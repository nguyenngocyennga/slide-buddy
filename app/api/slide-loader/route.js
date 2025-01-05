// ------------------------ PDF Text Extraction API ----------------------------------------
// This API endpoint extracts text from a PDF, splits the content into chunks,
// and returns the chunks in JSON format. It uses LangChain's WebPDFLoader
// and RecursiveCharacterTextSplitter for efficient text processing.

import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

/**
 * GET Request Handler
 * Processes a PDF file provided via the `pdfUrl` query parameter.
 * - Fetches the PDF from the provided URL.
 * - Extracts text content from the PDF using WebPDFLoader.
 * - Splits the extracted text into chunks using RecursiveCharacterTextSplitter.
 * - Returns the processed text chunks as JSON.
 */
export async function GET(request) {

    const requestUrl = request.url;
    const { searchParams } = new URL(requestUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    // console.log('pdfUrl', pdfUrl);

    // Fetch the slide from the URL
    const response = await fetch(pdfUrl);
    const data = await response.blob();
    const loader = new WebPDFLoader(data);
    const docs = await loader.load();

    // Extract the text content from the slide
    let slideTextContent = "";
    docs.forEach((doc) => {
        slideTextContent += doc.pageContent;
    });

    // Split the text content into chunks for processing
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000, // Maximum size of each chunk
        chunkOverlap: 100, // Overlap between chunks for context preservation
      });

    const output = await splitter.createDocuments([slideTextContent]);

    // Create a list of text chunks
    let splitterList = [];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    });

    // Return the chunks as a JSON response
    return NextResponse.json({result: splitterList});

}
