"use client";

import { useState } from "react";
import { BlogCard } from "@/app/components/main/UI";
import type { BlogPost } from "./posts";

type BlogLoadMoreProps = {
  posts: BlogPost[];
};

export default function BlogLoadMore({ posts }: BlogLoadMoreProps) {
  const [visibleCount, setVisibleCount] = useState(6);
  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visiblePosts.map((post) => (
          <BlogCard key={post.slug} {...post} slug={post.slug} />
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-12">
          <button
            onClick={() => setVisibleCount((count) => count + 3)}
            className="px-8 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
          >
            Load More Articles
          </button>
        </div>
      )}
    </>
  );
}
