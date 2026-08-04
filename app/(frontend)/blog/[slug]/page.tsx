import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "../posts";
import BlogPostContent from "./BlogPostContent";

export async function generateStaticParams() {
  return [];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostContent post={post} />;
}
