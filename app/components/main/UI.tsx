import Link from 'next/link'
import { Star, ChevronRight } from 'lucide-react'
import Image from 'next/image';

// Section Header
export function SectionHeader({ badge, title, subtitle }: {
  badge?: string; title: string; subtitle?: string;
}) {
  return (
    <div className="mb-12 flex flex-col items-center text-center justify-center">
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-3 uppercase tracking-wider">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse-slow"></span>
          {badge}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 dark:text-white leading-tight">{title}</h2>
      {subtitle && <p className="mt-3 text-gray-500 dark:text-gray-400 text-base leading-relaxed max-w-2xl">{subtitle}</p>}
    </div>
  )
}

// Stat Card
export function StatCard({ value, label, icon: Icon, color = 'blue' }: {
  value: string; label: string; icon: any; color?: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-950/50 text-orange-600 dark:text-orange-400',
  }
  return (
    <div className="text-center">
      <div className={`w-14 h-14 rounded-2xl ${colors[color]} flex items-center justify-center mx-auto mb-3`}>
        <Icon size={26} />
      </div>
      <div className="font-display text-3xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">{label}</div>
    </div>
  )
}

// Doctor Card
export function DoctorCard({ name, specialty, image, rating, experience }: {
  name: string; specialty: string; image: string; rating: number; experience: string;
}) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-56 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-900 overflow-hidden">
        <Image width={400} height={400} src={image} alt={name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <span className="absolute top-3 right-3 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm">
          {experience}
        </span>
      </div>
      <div className="p-5">
        <h3 className="font-display font-semibold text-gray-900 dark:text-white text-base">{name}</h3>
        <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-0.5">{specialty}</p>
        <div className="flex items-center gap-1 mt-2 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={13} className={i < Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-700'} />
          ))}
          <span className="text-gray-500 dark:text-gray-400 text-xs ml-1">{rating}</span>
        </div>
      </div>
    </div>
  )
}

// Service Card
export function ServiceCard({ icon: Icon, title, desc, color }: {
  icon: any; title: string; desc: string; color: string
}) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
    green: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
    red: 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400',
    purple: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400',
    cyan: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400',
  }
  return (
    <div className="group p-6 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className={`w-12 h-12 rounded-xl ${colors[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon size={22} />
      </div>
      <h3 className="font-display font-semibold text-gray-900 dark:text-white text-base mb-2">{title}</h3>
      <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  )
}

// Blog Card
export function BlogCard({ title, excerpt, category, date, image }: {
  title: string; excerpt: string; category: string; date: string; image: string; 
}) {
  return (
    <div className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <Image width={400} height={300} src={image} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{category}</span>
      </div>
      <div className="p-5">
        <p className="text-gray-400 dark:text-gray-500 text-xs mb-2">{date}</p>
        <h3 className="font-display font-semibold text-gray-900 dark:text-white text-base leading-snug mb-2 line-clamp-2">{title}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed line-clamp-2 mb-4">{excerpt}</p>
      </div>
    </div>
  )
}

// Testimonial Card
export function TestimonialCard({ name, text, rating, role, avatar }: {
  name: string; text: string; rating: number; role: string; avatar: string
}) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={15} className={i < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-5">"{text}"</p>
      <div className="flex items-center gap-3">
        <Image width={40} height={40} src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-gray-900 dark:text-white text-sm">{name}</div>
          <div className="text-gray-400 dark:text-gray-500 text-xs">{role}</div>
        </div>
      </div>
    </div>
  )
}

// Page Hero Banner
export function PageHero({ title, subtitle, }: {
  title: string; subtitle?: string;
}) {
  return (
    <div className="relative py-16 md:py-40 px-4 overflow-hidden z-10">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>
      <div className="relative max-w-7xl mx-auto text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-3">{title}</h1>
        {subtitle && <p className="text-blue-100 text-lg max-w-2xl mx-auto">{subtitle}</p>}
      </div>
    </div>
  )
}
