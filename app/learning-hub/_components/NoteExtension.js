import { BoldIcon, CodeIcon, Heading1Icon, Heading2Icon, Heading3Icon, HighlighterIcon, ItalicIcon, ListIcon, QuoteIcon, StrikethroughIcon } from 'lucide-react';
import React from 'react';
import Highlight from '@tiptap/extension-highlight';


function NoteExtension({ editor }) {
    return editor && (
        <div className='p-5'>
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


                </div>
            </div>
        </div>
    );
}

export default NoteExtension;