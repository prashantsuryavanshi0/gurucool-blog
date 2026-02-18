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
      // ✅ FIX: disable built-in link from StarterKit
      StarterKit.configure({
        link: false,
      }),

      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),

      Image.configure({
        inline: false,
        allowBase64: true,
      }),
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
      <div className="flex flex-wrap gap-2 mb-3">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="px-2 py-1 border rounded"
        >
          Bold
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="px-2 py-1 border rounded"
        >
          Italic
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="px-2 py-1 border rounded"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="px-2 py-1 border rounded"
        >
          List
        </button>

        <button
          type="button"
          onClick={addLink}
          className="px-2 py-1 border rounded"
        >
          Link
        </button>

        <button
          type="button"
          onClick={removeLink}
          className="px-2 py-1 border rounded"
        >
          Unlink
        </button>

        <button
          type="button"
          onClick={addImage}
          className="px-2 py-1 border rounded"
        >
          Image
        </button>
      </div>

      <EditorContent editor={editor} className="min-h-[150px]" />
    </div>
  );
}
