import { NextResponse } from "next/server";
import { blogs, Blog } from "@/lib/blogStore";
import { v4 as uuidv4 } from "uuid";

// GET: /api/blogs  OR  /api/blogs?id=123
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    const blog = blogs.find((b) => b.id === id);
    return NextResponse.json(blog ?? null);
  }

  return NextResponse.json(blogs);
}

// POST: create
export async function POST(req: Request) {
  const body = await req.json();

  const newBlog: Blog = {
    id: uuidv4(),
    title: body.title ?? "",
    author: body.author ?? "",
    content: body.content ?? "",
    createdAt: new Date().toISOString(),
  };

  blogs.push(newBlog);
  return NextResponse.json(newBlog);
}

// PUT: update
export async function PUT(req: Request) {
  const body = await req.json();
  const id = body.id as string;

  const index = blogs.findIndex((b) => b.id === id);
  if (index === -1) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  blogs[index] = {
    ...blogs[index],
    title: body.title ?? blogs[index].title,
    author: body.author ?? blogs[index].author,
    content: body.content ?? blogs[index].content,
  };

  return NextResponse.json(blogs[index]);
}

// DELETE: /api/blogs?id=123
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const index = blogs.findIndex((b) => b.id === id);
  if (index !== -1) blogs.splice(index, 1);

  return NextResponse.json({ message: "Deleted" });
}
