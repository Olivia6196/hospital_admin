"use client"
import { Star, Phone, Mail, Calendar, ChevronRight, Search } from 'lucide-react'
import Link from 'next/link'
import { PageHero } from '../../main/UI'
import { useEffect, useState } from 'react'
import Navbar from '../../main/Navbar'
import Footer from '../../main/Footer'

const specialties = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Surgery', 'Ophthalmology']

const doctors = [
  { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.9, experience: '15 Years', patients: 2400, image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face', education: 'Harvard Medical School', bio: 'Specializing in interventional cardiology with expertise in complex coronary interventions and structural heart disease.' },
  { name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, experience: '12 Years', patients: 1900, image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face', education: 'Johns Hopkins University', bio: 'Expert in movement disorders and neurodegenerative diseases with a focus on Parkinson\'s disease management.' },
  { name: 'Dr. Amelia Roberts', specialty: 'Pediatrics', rating: 5.0, experience: '10 Years', patients: 3200, image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face', education: 'Stanford Medical School', bio: 'Dedicated to providing comprehensive pediatric care from newborns through adolescence with a warm, family-centered approach.' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedics', rating: 4.7, experience: '18 Years', patients: 2800, image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face', education: 'Mayo Clinic', bio: 'Specializing in total joint replacement and sports medicine injuries with minimally invasive surgical techniques.' },
  { name: 'Dr. Priya Patel', specialty: 'Oncology', rating: 4.9, experience: '14 Years', patients: 1600, image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face', education: 'Columbia University', bio: 'Leading oncologist specializing in breast and lung cancers with expertise in immunotherapy and targeted treatments.' },
  { name: 'Dr. Robert Kim', specialty: 'Surgery', rating: 4.8, experience: '20 Years', patients: 3800, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face', education: 'Yale School of Medicine', bio: 'Board-certified general and laparoscopic surgeon with expertise in minimally invasive and robotic-assisted procedures.' },
  { name: 'Dr. Linda Thompson', specialty: 'Ophthalmology', rating: 4.8, experience: '11 Years', patients: 2100, image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=400&h=500&fit=crop&crop=face', education: 'UCLA Medical School', bio: 'Comprehensive eye care specialist with expertise in LASIK surgery, cataract removal, and glaucoma management.' },
  { name: 'Dr. David Park', specialty: 'Cardiology', rating: 4.6, experience: '9 Years', patients: 1400, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face', education: 'University of Pennsylvania', bio: 'Focusing on preventive cardiology, echocardiography, and heart failure management in complex cardiac patients.' },
]

export default function DoctorsPage() {
const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }
  return (
    <div className="bg-white dark:bg-gray-950">
      <Navbar dark={dark} toggleDark={toggleDark}/>
      <PageHero
        title="Our Expert Doctors"
        subtitle="Meet our team of 200+ board-certified specialists dedicated to your health"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Doctors' }]}
      />

      {/* Filter / Search */}
      <section className="py-10 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {specialties.map(s => (
              <button key={s}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${s === 'All' ? 'bg-blue-600 text-white' : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'}`}>
                {s}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input type="text" placeholder="Search doctor or specialty..."
              className="pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64" />
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map(doc => (
            <div key={doc.name} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="relative h-60 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-900 overflow-hidden">
                <img src={doc.image} alt={doc.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                  {doc.experience}
                </span>
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  <Star size={11} className="fill-white" /> {doc.rating}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-display font-semibold text-gray-900 dark:text-white text-base">{doc.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-0.5 mb-1">{doc.specialty}</p>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">{doc.bio}</p>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                  <span>{doc.patients.toLocaleString()} patients</span>
                  <span className="text-gray-300 dark:text-gray-700">|</span>
                  <span>{doc.education}</span>
                </div>
                <div className="flex gap-2">
                  <Link href="/appointments"
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all">
                    <Calendar size={13} /> Book
                  </Link>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                    <Phone size={13} />
                  </button>
                  <button className="w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 transition-all">
                    <Mail size={13} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-3">Are You a Healthcare Professional?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">Join our world-class medical team and make a difference in patients' lives.</p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105">
            Join Our Team <ChevronRight size={16} />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  )
}
