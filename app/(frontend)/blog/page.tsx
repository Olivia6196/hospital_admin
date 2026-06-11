import { Search } from 'lucide-react'
import { PageHero, SectionHeader, BlogCard } from '@/app/components/main/UI'

const categories = ['All', 'Cardiology', 'Neurology', 'Pediatrics', 'Wellness', 'Nutrition', 'Surgery', 'Mental Health']

const posts = [
  { title: 'Understanding Heart Disease: Prevention and Early Detection', excerpt: 'Heart disease remains the leading cause of death worldwide. Learn how to reduce your risk with lifestyle changes and regular screenings.', category: 'Cardiology', date: 'Dec 10, 2024', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop', href: '/blog/heart-disease' },
  { title: 'The Importance of Regular Health Check-Ups', excerpt: 'Regular health screenings can catch problems early when they are most treatable. Discover the key tests every adult should have.', category: 'Wellness', date: 'Dec 5, 2024', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop', href: '/blog/check-ups' },
  { title: "Children's Mental Health: What Parents Should Know", excerpt: "Mental health is just as important as physical health. Here's how to support your child's emotional wellbeing.", category: 'Pediatrics', date: 'Nov 28, 2024', image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop', href: '/blog/childrens-mental-health' },
  { title: 'Advances in Minimally Invasive Surgery', excerpt: 'New techniques in laparoscopic and robotic-assisted surgery are reducing recovery time and improving patient outcomes dramatically.', category: 'Surgery', date: 'Nov 20, 2024', image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop', href: '/blog/minimally-invasive' },
  { title: 'Nutrition and Brain Health: What the Research Says', excerpt: 'Emerging research shows strong links between diet and cognitive function. Learn which foods support a healthy brain.', category: 'Neurology', date: 'Nov 14, 2024', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop', href: '/blog/brain-nutrition' },
  { title: 'Managing Diabetes: A Comprehensive Guide', excerpt: 'Living with diabetes requires careful management. Our endocrinologists share practical tips for maintaining healthy blood sugar levels.', category: 'Wellness', date: 'Nov 8, 2024', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&h=400&fit=crop', href: '/blog/diabetes-management' },
  { title: 'The Rise of Telemedicine: Changing Healthcare Access', excerpt: 'Telemedicine has revolutionized how patients access care. Discover the benefits and limitations of virtual healthcare visits.', category: 'Wellness', date: 'Nov 1, 2024', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop', href: '/blog/telemedicine' },
  { title: 'Understanding Anxiety Disorders: Signs and Treatment', excerpt: 'Anxiety affects millions of people worldwide. Learn to recognize the signs and explore evidence-based treatment options.', category: 'Mental Health', date: 'Oct 25, 2024', image: 'https://images.unsplash.com/photo-1559757175-7cb057fba93c?w=600&h=400&fit=crop', href: '/blog/anxiety-disorders' },
  { title: 'Bone Health After 50: Prevention of Osteoporosis', excerpt: 'As we age, maintaining strong bones becomes increasingly important. Discover key strategies to prevent bone loss and fractures.', category: 'Wellness', date: 'Oct 18, 2024', image: 'https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=600&h=400&fit=crop', href: '/blog/bone-health' },
]

const featured = posts[0]

export default function BlogPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <PageHero
        title="Health Blog & News"
        subtitle="Expert insights, medical news, and wellness tips from our specialists"
      />

      {/* Search & Filter */}
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map(c => (
              <button key={c}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${c === 'All' ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                {c}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search articles..." className="pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-56" />
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-3xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-lg grid md:grid-cols-2">
            <div className="aspect-[4/3] md:aspect-auto overflow-hidden">
              <img src={featured.image} alt={featured.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="p-10 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
                Featured • {featured.category}
              </span>
              <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">{featured.title}</h2>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{featured.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400 dark:text-gray-500">{featured.date}</span>
                <a href={featured.href} className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all hover:scale-105">Read Article</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* All Posts Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Latest Articles" title="Medical Insights & Updates" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(1).map(p => <BlogCard key={p.title} {...p} />)}
          </div>
          <div className="text-center mt-12">
            <button className="px-8 py-3 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
              Load More Articles
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-xl mx-auto text-center text-white">
          <h2 className="font-display text-3xl font-bold mb-3">Stay Informed</h2>
          <p className="text-blue-100 mb-6">Subscribe to our newsletter for the latest health tips and medical news from our specialists.</p>
          <div className="flex gap-3">
            <input type="email" placeholder="Enter your email address"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-blue-200 text-sm focus:outline-none focus:ring-2 focus:ring-white/50" />
            <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  )
}
