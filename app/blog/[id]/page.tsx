import Link from "next/link";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getBlog(id: string) {
  const h = await headers();
  const host = h.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";

  const res = await fetch(`${protocol}://${host}/api/blogs?id=${id}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600">Blog not found.</p>
          <Link href="/" className="inline-block mt-4 text-blue-600 font-medium">
            ← Back
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold">{blog.title}</h1>

        <p className="text-gray-600 text-sm mt-2">
          By {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <div
          className="mt-6 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <div className="mt-8 flex gap-3">
          <Link href="/" className="text-blue-600 font-medium">
            ← Back
          </Link>

          <Link
            href={`/edit/${blog.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
