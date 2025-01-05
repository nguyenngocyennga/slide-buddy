// ------------------------ Note Extension Component ----------------------------------------
// This component provides an enhanced toolbar for the Tiptap editor in the Learning Hub.
// It includes various formatting options, an AI assistant for answering questions, and a "Save Notes" button.
// The AI assistant integrates with Convex and Gemini AI to generate context-aware responses.

import { BoldIcon, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, HighlighterIcon, ItalicIcon, ListIcon, QuoteIcon, RocketIcon, SparklesIcon, StrikethroughIcon } from 'lucide-react';
import React from 'react';
import Highlight from '@tiptap/extension-highlight';
import { useAction, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useParams } from 'next/navigation';
import { chatSession } from '@/configs/AIModel';
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs';
import { Button } from '@/components/ui/button';

/**
 * NoteExtension Component
 * Provides an interactive toolbar for text formatting, AI-assisted content generation, and note-saving functionality.
 * 
 * Props:
 * @param {object} editor - The Tiptap editor instance used for rich-text editing.
 * 
 * @returns {JSX.Element} - A toolbar for the Tiptap editor.
 */
function NoteExtension({ editor }) {
    // Extract slide ID from the URL
    const { slideId } = useParams();

    // Fetch user details from Clerk
    const { user } = useUser();

    // Convex API actions and mutations
    const searchAI = useAction(api.myAction.search);
    const addNotes = useMutation(api.notes.addNotes);

    /**
     * Handles the "Ask Buddy" AI assistant functionality.
     * Fetches context-aware answers using selected text and AI models.
     */
    const onAiClick = async () => {
        toast('🚀 Our Buddy is thinking...');
        // console.log('AI Clicked!');

        // Get the selected text in the editor
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
        )
        // console.log("selectedText", selectedText);

        // Fetch related content using Convex 
        const searchAIResult = await searchAI({
            query: selectedText,
            slideId: slideId
        })

        // Combine all fetched content into one string
        const unformattedSearchAIResult = JSON.parse(searchAIResult);

        // console.log("unformatted searchAIResult", searchAIResult);

        let allUnformattedAnswers = "";
        unformattedSearchAIResult && unformattedSearchAIResult.forEach(
            item => {
                allUnformattedAnswers += item.pageContent
            }
        );

        // Create a prompt for the Gemini AI
        const PROMT = "For question: " + selectedText + " and the given content as answer, please give appropriate answer in HTML format. The answer content is: "+ allUnformattedAnswers + "If the content is not clear, you can come up with your own answer. If there is a number standalone out of context, please ignore it as it's likely page number or typo, don't include it in response. If the provided text does not have enough information, you can mention that but also provide extra information not included in the provided content, it would be helpful for user. Thank you!";

        // Get AI-generated response
        const geminiAIResult = await chatSession.sendMessage(PROMT);
        // console.log("geminiAIResult", geminiAIResult.response.text());

        // Strip unnecessary formatting from the AI response
        const finalAnswers = geminiAIResult.response.text().trim();
        const strippedAnswers = finalAnswers.startsWith('```html') ? finalAnswers.slice(7) : finalAnswers;
        const cleanAnswers = strippedAnswers.endsWith('```') ? strippedAnswers.slice(0, -3) : strippedAnswers;

        // Append AI response to the editor content
        const allText = editor.getHTML();
        editor.commands.setContent(allText + "</div><p><strong>Answer 🚀:</strong></p>" + cleanAnswers+ "<br/><br/></div>")

        // Save updated notes to the database
        addNotes({
            notes: editor.getHTML(),
            slideId: slideId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })

    };

    /**
     * Saves the current editor content as notes.
     */
    const onSaveClick = () => {
        addNotes({
            notes: editor.getHTML(),
            slideId: slideId,
            createdBy: user?.primaryEmailAddress?.emailAddress  
        });
        toast('🚀 Notes saved successfully!');
    };

    return editor && (
        <div className='' style={{ position: 'relative'}}>
            <Button
                onClick={onSaveClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '35px',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                Save Notes 🚀
            </Button>
            <div className="control-group sticky top-0 z-10 flex gap-3 p-3 bg-white shadow-sm border-t border-b border-gray-200">
                <div className="button-group flex gap-5">
                <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                        className={editor.isActive('heading', { level: 1 }) ? 'text-[#5574e6]' : ''}
                    >
                        <Heading1Icon />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'text-[#5574e6]' : ''}
                    >
                        <Heading2Icon />
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'text-[#5574e6]' : ''}
                    >
                        <Heading3Icon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'text-[#5574e6]' : ''}
                    >
                        <BoldIcon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'text-[#5574e6]' : ''}
                    >
                        <ItalicIcon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleStrike().run()}
                        className={editor.isActive('strike') ? 'text-[#5574e6]' : ''}
                    >
                        <StrikethroughIcon />
                    </button>

                    {/* <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'text-[#5574e6]' : ''}
                    >
                        <CodeIcon />
                    </button> */}

                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'text-[#5574e6]' : ''}
                        >
                        <ListIcon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleBlockquote().run()}
                        className={editor.isActive('blockquote') ? 'text-[#5574e6]' : ''}
                    >
                        <QuoteIcon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                        className={editor.isActive('codeBlock') ? 'is-active' : ''}
                    >
                        <CodeIcon />
                    </button>

                    <button
                        onClick={() => editor.chain().focus().toggleHighlight({ color: '#f9c74f' }).run()}
                        className={editor.isActive('highlight', { color: '#f9c74f' }) ? 'text-[#5574e6]' : ''}
                    >
                        <HighlighterIcon />
                    </button>

                    <button
                        onClick={() => onAiClick()}
                        className={"rounded border border-[#5574e6] text-[#5574e6] hover:bg-[#5574e6] hover:text-white p-1"}
                        >
                        <span className='flex'>
                        {/* <RocketIcon className='hover:text-[#5574e6]' /> */}
                        🚀 Ask Buddy! </span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteExtension;
// export { NoteExtension, addNotes };