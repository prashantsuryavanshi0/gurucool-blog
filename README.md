# Blog Application

Hi! This is my blog application built as a frontend assignment using Next.js App Router.

The goal was to build a simple but functional blog platform where users can create, read, edit, and delete blogs using modern Next.js features.

I focused on keeping the UI clean, simple, and easy to use while following the assignment requirements.



##  Features

###  Blog Listing
- Server-side rendered blog list
- Displays title, author, and date
- "Read More" button to view full blog

###  Blog Details
- Dynamic routing using blog ID (`/blog/[id]`)
- Fully formatted rich text content
- Handles non-existing blogs gracefully
- SEO-friendly metadata

###  Create Blog
- Title and author inputs
- Rich text editor using TipTap
- Supports:
  - Bold
  - Italic
  - Headings
  - Bullet lists
  - Links
  - Images
- Saves blog via API route

###  Dashboard
- View all blogs
- Edit existing blogs
- Delete blogs instantly



##  Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TipTap Editor
- Next.js Route Handlers (API)
- In-memory storage (array-based)



##  SSR Approach

Server-Side Rendering (SSR) is used for:

- Blog listing page
- Blog detail page

Data is fetched on the server using Next.js server components with `cache: "no-store"` to ensure fresh content. This improves initial load performance and helps SEO.



##  Editor Integration

The rich text editor is implemented using **TipTap**.

Features included:
- Bold and italic formatting
- Headings
- Bullet lists
- Links and unlink
- Image insertion

Editor content is saved as HTML and rendered safely on the blog detail page.



##  SEO Strategy

Basic SEO has been implemented using Next.js metadata:

- Page title
- Description
- Dynamic metadata for blog detail pages

This helps search engines understand page content and improves visibility.



## How to Run Locally

npm install
npm run dev

