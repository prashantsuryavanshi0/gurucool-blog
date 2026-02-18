"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Editor from "@/app/create/Editor";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const id = params?.id;

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (!id) return;

    const load = async () => {
      const res = await fetch(`/api/blogs?id=${id}`, { cache: "no-store" });
      const blog = await res.json();

      if (!blog) {
        router.push("/dashboard");
        return;
      }

      setTitle(blog.title);
      setAuthor(blog.author);
      setContent(blog.content);
    };

    load();
  }, [id, router]);

  const handleUpdate = async () => {
    if (!id) return;

    await fetch("/api/blogs", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, title, author, content }),
    });

    router.push(`/blog/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Edit Blog</h1>

        <input
          className="w-full border p-3 rounded mb-4"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Blog Title"
        />

        <input
          className="w-full border p-3 rounded mb-4"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author Name"
        />

        <Editor content={content} setContent={setContent} />

        <button
          onClick={handleUpdate}
          className="mt-6 bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
        >
          Update Blog
        </button>
      </div>
    </div>
  );
}
