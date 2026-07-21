"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../posts";

type BlogPostContentProps = {
  post: BlogPost;
};

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const paragraphs = post.content.split("\n\n").filter(Boolean);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <section className="px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 font-semibold text-sm hover:underline"
          >
            ← Back to blog
          </Link>

          <div className="mt-6 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm">
            <Image
              src={post.image}
              alt={post.title}
              width={1200}
              height={700}
              className="w-full h-72 md:h-96 object-cover"
            />
          </div>

          <div className="mt-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">{post.date}</span>
              {post.readTime && (
                <span className="text-sm text-gray-500 dark:text-gray-400">• {post.readTime}</span>
              )}
              {post.author && (
                <span className="text-sm text-gray-500 dark:text-gray-400">• {post.author}</span>
              )}
            </div>

            <h1 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight mt-5">
              {post.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mt-6 text-lg">
              {post.excerpt}
            </p>

            <div className="mt-8 space-y-5">
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {post.highlights && post.highlights.length > 0 && (
              <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 dark:border-blue-900 dark:bg-blue-950/40 p-6">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  What our hospital team wants you to know
                </h2>
                <div className="mt-4 space-y-3">
                  {post.highlights.map((item, index) => {
                    const isOpen = openIndex === index;

                    return (
                      <div
                        key={item.title}
                        className="rounded-xl border border-blue-200 bg-white/70 dark:border-blue-800 dark:bg-gray-900/60"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenIndex(isOpen ? null : index)}
                          aria-expanded={isOpen}
                          className="flex w-full items-center justify-between px-4 py-4 text-left"
                        >
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </span>
                          <span className="text-lg text-blue-600 dark:text-blue-400">
                            {isOpen ? "−" : "+"}
                          </span>
                        </button>

                        {isOpen && (
                          <div className="px-4 pb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                            {item.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
