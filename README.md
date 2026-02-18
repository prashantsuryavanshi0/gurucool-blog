# Blog Application

Hi! This is my blog application.

The goal was to build a simple but functional blog platform where users can create, read, edit, and delete blogs using modern Next.js features.

I focused on keeping the UI clean and the code simple.

## Features

### Blog Listing

- Server-side rendered blog list
- Shows title, author, and date
- "Read More" button to view full blog

### Blog Details

- Dynamic routing using blog ID
- Fully formatted rich text content
- SEO-friendly metadata

### Create Blog

- Title and author inputs
- Rich text editor using TipTap
- Supports:
  - Bold
  - Italic
  - Headings
  - Bullet lists
  - Links
  - Images
- Saves blog via API

### Dashboard

- View all blogs
- Edit existing blogs
- Delete blogs instantly

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- TipTap Editor
- Next.js Route Handlers (API)
- In-memory storage (array-based)

## SEO

Basic SEO has been added using Next.js metadata:

- Page titles
- Descriptions
- Dynamic metadata for blog pages

## How to Run Locally

npm install
npm run dev
