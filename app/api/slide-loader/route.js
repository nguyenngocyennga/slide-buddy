import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";


// const slideUrl = "https://shiny-greyhound-276.convex.cloud/api/storage/ad7bd9e9-2c34-4a5c-be72-6557878b76b2" 

export async function GET(request) {

    const requestUrl = request.url;
    const { searchParams } = new URL(requestUrl);
    const pdfUrl = searchParams.get("pdfUrl");
    console.log('pdfUrl', pdfUrl);

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

    // Split the text content into chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
      });

    const output = await splitter.createDocuments([slideTextContent]);

    // Create a list of text chunks
    let splitterList = [];
    output.forEach((doc) => {
        splitterList.push(doc.pageContent);
    });

    // Return the text content
    return NextResponse.json({result: splitterList});

}
