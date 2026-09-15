import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "../posts";
import BlogPostContent from "./BlogPostContent";

const siteUrl =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://hospital-admin-omega.vercel.app";

export async function generateStaticParams() {
  return [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found",
      robots: { index: false, follow: false },
    };
  }

  const url = `${siteUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    robots: { index: true, follow: true },
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      siteName: "LiviaCore Hospital",
      type: "article",
      images: [
        {
          url: post.image || "/images/hospital-logo.png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image || "/images/hospital-logo.png"],
    },
  };
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
