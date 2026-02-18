"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Editor from "./Editor";

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  const handlePublish = async () => {
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, content }),
    });

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Create Blog</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Author Name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Editor content={content} setContent={setContent} />

        <button
          onClick={handlePublish}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Publish Blog
        </button>
      </div>
    </div>
  );
}
