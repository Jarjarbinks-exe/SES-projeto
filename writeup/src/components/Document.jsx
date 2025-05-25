import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/react'

import React from 'react'
import "./Document.css"

import { useSearchParams } from 'react-router-dom';

export default () => {
    const [searchParams] = useSearchParams()
    const documentId = searchParams.get('id')

    const editor = useEditor({
        extensions: [
            StarterKit
        ],
        content: `<p>Document ID: ${documentId}</p>`, // Use the documentID in the content
    })

    return (
        <EditorContent editor={editor} />
    )
}
