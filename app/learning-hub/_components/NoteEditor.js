// ------------------------ Note Editor Component ----------------------------------------
// This component provides a rich-text editor for taking notes on a specific slide.
// It uses Tiptap, a highly extensible editor framework, and integrates custom extensions like highlights and placeholders.
// Notes are dynamically fetched from the database and displayed in the editor.

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

/**
 * NoteEditor Component
 * A rich-text editor built using Tiptap for note-taking on a specific slide.
 * 
 * Features:
 * - Fetches notes for the given slide ID and displays them in the editor.
 * - Supports placeholder text and multicolor highlights.
 * - Integrates custom extensions for a tailored note-taking experience.
 */
function NoteEditor({ slideId }) {
    // Fetch notes associated with the given slide ID
    const notes = useQuery(api.notes.getNotes, {
        slideId: slideId,
    });

    // Initialize the Tiptap editor with custom extensions
    const editor = useEditor({
        extensions: [
            StarterKit, // Basic editing functionalities like bold, italics, and headings
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
        content: '', // Initial content for the editor
        editorProps: {
            attributes: {
                class: 'focus:outline-none h-screen p-5', // Styling for the editor
            },
        },
      })

      // Update editor content whenever notes are fetched
      useEffect(() => {
        editor && editor.commands.setContent(notes); // Safeguard against undefined notes
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