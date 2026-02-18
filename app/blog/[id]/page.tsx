import Link from "next/link";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

// SEO for each blog
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(
    `http://localhost:3000/api/blogs?id=${id}`,
    { cache: "no-store" }
  );

  const blog = await res.json();

  return {
    title: blog?.title || "Blog",
    description:
      blog?.content?.replace(/<[^>]*>/g, "").slice(0, 120) ||
      "Blog details page",
  };
}

async function getBlog(id: string) {
  const res = await fetch(
    `http://localhost:3000/api/blogs?id=${id}`,
    { cache: "no-store" }
  );

  return res.json();
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const blog = await getBlog(id);

  if (!blog) return notFound();

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-2">{blog.title}</h1>

        <p className="text-gray-600 mb-6">
          By {blog.author} •{" "}
          {new Date(blog.createdAt).toLocaleDateString()}
        </p>

        <div
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        <Link
          href="/"
          className="inline-block mt-6 text-blue-600"
        >
          ← Back
        </Link>
      </div>
    </div>
  );
}
