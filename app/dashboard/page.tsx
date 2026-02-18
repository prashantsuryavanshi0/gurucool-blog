"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Dashboard() {
  const [blogs, setBlogs] = useState<any[]>([]);

  const fetchBlogs = async () => {
    const res = await fetch("/api/blogs", { cache: "no-store" });
    const data = await res.json();
    setBlogs(data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    await fetch(`/api/blogs?id=${id}`, {
      method: "DELETE",
    });

    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        {blogs.length === 0 && (
          <p className="text-gray-600">No blogs to manage.</p>
        )}

        <div className="space-y-4">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-5 rounded-lg shadow flex items-start justify-between gap-4"
            >
              <div>
                <h2 className="text-lg font-semibold">{blog.title}</h2>
                <p className="text-sm text-gray-600">
                  By {blog.author} •{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/edit/${blog.id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Edit
                </Link>

                <button
                  onClick={() => handleDelete(blog.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
