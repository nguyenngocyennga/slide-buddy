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


function NoteExtension({ editor }) {
    const { slideId } = useParams();
    const { user } = useUser();

    const searchAI = useAction(api.myAction.search);

    const addNotes = useMutation(api.notes.addNotes);

    const onAiClick = async () => {
        toast('🚀 Our Buddy is thinking...');
        // console.log('AI Clicked!');
        const selectedText = editor.state.doc.textBetween(
            editor.state.selection.from,
            editor.state.selection.to,
            " "
        )
        console.log("selectedText", selectedText);
        const searchAIResult = await searchAI({
            query: selectedText,
            slideId: slideId
        })

        const unformattedSearchAIResult = JSON.parse(searchAIResult);

        // console.log("unformatted searchAIResult", searchAIResult);

        let allUnformattedAnswers = "";
        unformattedSearchAIResult && unformattedSearchAIResult.forEach(
            item => {
                allUnformattedAnswers += item.pageContent
            }
        );

        const PROMT = "For question: " + selectedText + " and the given content as answer, please give appropriate answer in HTML format. The answer content is: "+ allUnformattedAnswers + "If the content is not clear, you can come up with your own answer. Thank you!";

        const geminiAIResult = await chatSession.sendMessage(PROMT);
        console.log("geminiAIResult", geminiAIResult.response.text());

        const finalAnswers = geminiAIResult.response.text().trim();
        const strippedAnswers = finalAnswers.startsWith('```html') ? finalAnswers.slice(7) : finalAnswers;
        const cleanAnswers = strippedAnswers.endsWith('```') ? strippedAnswers.slice(0, -3) : strippedAnswers;

        const allText = editor.getHTML();
        editor.commands.setContent(allText + "</div><p><strong>Answer 🚀:</strong></p>" + cleanAnswers+ "<br/></div>")

        addNotes({
            notes: editor.getHTML(),
            slideId: slideId,
            createdBy: user?.primaryEmailAddress?.emailAddress
        })

    };

    const onSaveClick = () => {
        addNotes({
            notes: editor.getHTML(),
            slideId: slideId,
            createdBy: user?.primaryEmailAddress?.emailAddress  
        });
        toast('🚀 Notes saved successfully!');
    };

    return editor && (
        <div className='p-5' style={{ position: 'relative', paddingBottom: '60px' }}>
            <Button
                onClick={onSaveClick}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    backgroundColor: '#5574e6',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
                className="hover:bg-[#405bb5]"
            >
                Save Notes 🚀
            </Button>
            <div className="control-group">
                <div className="button-group flex gap-3">
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