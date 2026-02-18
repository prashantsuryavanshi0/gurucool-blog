import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getBlogs() {
  const h = await headers(); 
  const host = h.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/blogs`, {
    cache: "no-store",
  });

  return res.json();
}

export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Blog Application</h1>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {blogs.length === 0 && (
          <p className="text-center text-gray-500">No blogs available.</p>
        )}

        {blogs.map((blog: any) => (
          <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{blog.title}</h2>

            <p className="text-gray-600 text-sm mt-1">
              By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
            </p>

            <Link
              href={`/blog/${blog.id}`}
              className="inline-block mt-4 text-blue-600 font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
