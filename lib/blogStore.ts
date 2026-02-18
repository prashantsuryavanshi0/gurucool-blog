export type Blog = {
  id: string;
  title: string;
  author: string;
  content: string; // HTML from TipTap
  createdAt: string;
};

export const blogs: Blog[] = [];
