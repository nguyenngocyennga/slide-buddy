import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useEffect } from 'react';
import NoteExtension from './NoteExtension';
// import { Markdown } from 'tiptap-markdown';
import Highlight from '@tiptap/extension-highlight'
// import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import { all, createLowlight } from 'lowlight'
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';

const lowlight = createLowlight(all)

function NoteEditor({ slideId }) {

    const notes = useQuery(api.notes.getNotes, {
        slideId: slideId,
    });

    const editor = useEditor({
        extensions: [
            StarterKit, 
            // Markdown,
            Placeholder.configure({
                placeholder: "Jot down your notes... or chat with our Buddy for clarity! ✨ 🤓"
            }),
            Highlight.configure({
                multicolor: true, // Allow multiple highlight colors
            }),
            // CodeBlockLowlight.configure({
            //     lowlight,
            //   }),
        ],
        content: '',
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5',
            },
        },
      })

      useEffect(() => {
        editor && editor.commands.setContent(notes);
      }, [notes && editor]);

    return (
        <div>
            <NoteExtension editor={editor} />
            <div className='overflow-scroll h-[90vh]'>
                <EditorContent editor={editor} />
            </div>
        </div>
    );
}

export default NoteEditor;