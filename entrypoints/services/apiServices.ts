import { GoogleGenerativeAI } from "@google/generative-ai";
import getLatestContentAndName  from "./content.ts";
export async function generateAIContent(prompt: string): Promise<string> {
     let ContentName=getLatestContentAndName();
     let promptMessage=`Name of the sender is:${ContentName.name} and the message is ${ContentName.content} and the prompt is ${prompt} and when i give you same prompt it is my conversation with ${ContentName.name} and the message is ${ContentName.content} also only send the message i can send him directly without any changes`;
     console.log(promptMessage);
    const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptMessage);

    // Fetch and highlight text with Markdown
    const rawResponse = result.response.text();
    const highlightedResponse = highlightText(rawResponse, prompt);

    return highlightedResponse;
}

// Helper function to apply Markdown bold to specific keywords
function highlightText(responseText: string, keyword: string): string {
    const keywordPattern = new RegExp(`(${keyword})`, 'gi'); // case-insensitive
    console.log("Keyword pattern:", keywordPattern); // Debug: check the regex pattern
    console.log("Response text before highlight:", responseText); // Debug: check the raw text

    // Wrap the keyword with <strong> tags for bold effect
    const highlightedText = responseText.replace(keywordPattern, '<strong>$1</strong>');
    console.log("Response text after highlight:", highlightedText); // Debug: check the highlighted text
    return highlightedText;
}