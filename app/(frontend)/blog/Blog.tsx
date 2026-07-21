import { PageHero, SectionHeader } from "@/app/components/main/UI";
import Link from "next/link";
import Image from "next/image";
import { blogPosts, featuredBlogPost } from "./posts";
import BlogLoadMore from "./BlogLoadMore";

const posts = blogPosts;
const featured = featuredBlogPost;

export default function BlogPage() {
  const allPosts = posts.slice(1);

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/blogbg.jpg')] bg-cover bg-center relative">
        <PageHero
          title="Health Blog & News"
          subtitle="Expert insights, medical news, and wellness tips from our specialists"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg grid md:grid-cols-2">
            <div className="aspect-4/3 md:aspect-auto overflow-hidden">
              <Image
                width={600}
                height={400}
                src={featured.image}
                alt={featured.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="p-5 md:p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Featured • {featured.category}
              </span>
              <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {featured.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
                {featured.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  {featured.date}
                </span>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all hover:scale-105"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Latest Articles"
            title="Medical Insights & Updates"
          />
          <BlogLoadMore posts={allPosts} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-3">
            Stay Informed
          </h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter for the latest health tips and medical
            news from our specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
            />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
