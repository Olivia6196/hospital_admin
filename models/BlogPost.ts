import { Document, Schema, model, models } from "mongoose";

export interface IBlogPost extends Document {
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  slug: string;
  content: string;
  highlights: Array<{ title: string; answer: string }>;
  author?: string;
  readTime?: string;
}

const HighlightSchema = new Schema(
  {
    title: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { _id: false }
);

const BlogPostSchema = new Schema<IBlogPost>(
  {
    title: { type: String, required: true },
    excerpt: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: String, required: true },
    image: { type: String, required: true },
    slug: { type: String, required: true, unique: true, trim: true },
    content: { type: String, required: true },
    highlights: { type: [HighlightSchema], default: [] },
    author: { type: String },
    readTime: { type: String },
  },
  { timestamps: true }
);

export const BlogPost = models.BlogPost || model<IBlogPost>("BlogPost", BlogPostSchema);
