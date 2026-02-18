"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

interface Props {
  content: string;
  setContent: (value: string) => void;
}

export default function Editor({ content, setContent }: Props) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      
      StarterKit.configure({
        link: false,
      }),

      
      Link.configure({
        openOnClick: true,
      }),

      Image,
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  const addLink = () => {
    const url = prompt("Enter URL");
    if (!url) return;
    editor.chain().focus().setLink({ href: url }).run();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (!url) return;
    editor.chain().focus().setImage({ src: url }).run();
  };

  return (
    <div className="border rounded p-4 bg-white">
      <div className="flex gap-2 mb-3">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>Bold</button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>Italic</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>List</button>
        <button onClick={addLink}>Link</button>
        <button onClick={removeLink}>Unlink</button>
        <button onClick={addImage}>Image</button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
