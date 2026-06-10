"use client"
import Link from 'next/link'
import { 
  ArrowRight, Calendar, Clock, Users, Award, Heart, 
  Shield, Stethoscope, Brain, Bone, Baby, Microscope,
  Zap, CheckCircle, Phone, MapPin, Star
} from 'lucide-react'
import { PageHero, SectionHeader, ServiceCard, DoctorCard, TestimonialCard, BlogCard } from '@/app/components/main/UI'
import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import CountUp from "react-countup";

const doctors = [
  { name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.9, experience: '10 Yrs', href: '/doctors', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=500&fit=crop&crop=face' },
  { name: 'Dr. Michael Chen', specialty: 'Neurologist', rating: 4.8, experience: '8 Yrs', href: '/doctors', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=500&fit=crop&crop=face' },
  { name: 'Dr. Amelia Roberts', specialty: 'Pediatrician', rating: 5.0, experience: '7 Yrs', href: '/doctors', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=500&fit=crop&crop=face' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedic', rating: 4.7, experience: '9 Yrs', href: '/doctors', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=500&fit=crop&crop=face' },
]

const services = [
  { icon: Heart, title: 'Cardiology', desc: 'Advanced heart care with state-of-the-art diagnostic equipment and experienced specialists.', color: 'red' },
  { icon: Brain, title: 'Neurology', desc: 'Expert neurological care for brain, spine, and nervous system conditions.', color: 'purple' },
  { icon: Bone, title: 'Orthopedics', desc: 'Comprehensive bone, joint, and muscle care including joint replacement surgery.', color: 'blue' },
  { icon: Baby, title: 'Pediatrics', desc: 'Specialized care for infants, children, and adolescents with compassion and expertise.', color: 'green' },
  { icon: Microscope, title: 'Diagnostics', desc: 'Advanced lab tests and imaging for accurate diagnosis and treatment planning.', color: 'cyan' },
  { icon: Zap, title: 'Emergency Care', desc: '24/7 emergency services with rapid response teams and critical care specialists.', color: 'orange' },
]

const blogs = [
  {
    title: 'Understanding Heart Disease: Prevention and Early Detection',
    excerpt: 'Heart disease remains the leading cause of death worldwide. Learn how to reduce your risk with lifestyle changes and early screening.',
    category: 'Cardiology', date: 'Dec 10, 2024',
    image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=600&h=400&fit=crop',
    href: '/blog/heart-disease'
  },
  {
    title: 'The Importance of Regular Health Check-Ups',
    excerpt: 'Regular health screenings can catch problems early when they are most treatable. Discover the key tests every adult should have.',
    category: 'Wellness', date: 'Dec 5, 2024',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=400&fit=crop',
    href: '/blog/check-ups'
  },
  {
    title: 'Children\'s Mental Health: What Parents Should Know',
    excerpt: 'Mental health is just as important as physical health. Here\'s how to support your child\'s emotional wellbeing.',
    category: 'Pediatrics', date: 'Nov 28, 2024',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&h=400&fit=crop',
    href: '/blog/childrens-mental-health'
  },
]

const testimonials = [
  { name: 'Jennifer Adams', role: 'Patient', rating: 5, avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', text: 'MediCore truly cares about its patients. The doctors and staff went above and beyond to make me feel comfortable during my treatment.' },
  { name: 'Robert Martinez', role: 'Patient', rating: 5, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', text: 'Exceptional care from the moment I walked in. The team was professional, attentive, and made my recovery much smoother than expected.' },
  { name: 'Linda Thompson', role: 'Patient', rating: 5, avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100&h=100&fit=crop&crop=face', text: 'I couldn\'t be happier with the treatment I received. The doctors were knowledgeable and explained everything clearly.' },
]

const stats = [
            { value: '1,500+', label: 'Patients Treated', icon: Users, color: 'blue' },
            { value: '22', label: 'Years of Service', icon: Award, color: 'blue' },
            { value: '14+', label: 'Departments', icon: Heart, color: 'blue' },
            { value: '35+', label: 'Expert Doctors', icon: Stethoscope, color: 'blue' },
          ]

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "-100px" });

  // used to force CountUp re-animation
  const [key, setKey] = useState(0);

  useEffect(() => {
    if (isInView) {
      setKey((prev) => prev + 1); // remount CountUp
    }
  }, [isInView]);
  return (
    <div className="bg-white dark:bg-gray-950">
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50 via-white to-blue-50 dark:from-gray-950 dark:via-gray-950 dark:to-blue-950/20" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 dark:opacity-10"
          style={{ background: 'radial-gradient(circle at 70% 50%, #2563eb 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="animate-slide-up">
            <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
              Find a Doctor<br />
              <span className="text-blue-600">&amp; Book Online</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
              Access world-class healthcare from the comfort of your home. Connect with 200+ specialists, book appointments, and manage your health records in one place.
            </p>
            <div className="flex flex-wrap gap-4 mb-10">
              <Link href="/appointments"
                className="flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:scale-105 active:scale-95">
                <Calendar size={18} /> Book Appointment
              </Link>
              <Link href="/services"
                className="flex items-center gap-2 px-7 py-3.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all hover:scale-105">
                Our Services <ArrowRight size={18} />
              </Link>
            </div>
            {/* Quick stats row */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100 dark:border-gray-800">
              {[
                { val: '1,500+', label: 'Patients Served', icon: Users },
                { val: '35+', label: 'Specialists', icon: Stethoscope },
                { val: '98%', label: 'Success Rate', icon: Award },
              ].map(({ val, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="font-display font-bold text-gray-900 dark:text-white text-lg leading-tight">{val}</div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: image collage */}
          <div className="relative hidden lg:block animate-fade-in">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              <div className="absolute top-0 right-0 w-72 h-80 rounded-3xl overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=600&h=700&fit=crop" alt="Doctor" className="w-full h-full object-cover" />
              </div>
              <div className="absolute bottom-8 left-0 w-52 h-64 rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-gray-950">
                <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?w=400&h=500&fit=crop" alt="Medical" className="w-full h-full object-cover" />
              </div>
              {/* Floating cards */}
              <div className="absolute top-4 left-4 bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-xl border border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-950/50 flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Appointment</div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">Confirmed!</div>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-blue-600 rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-2 text-white">
                  <Clock size={16} />
                  <div>
                    <div className="text-xs text-blue-200">Available</div>
                    <div className="font-bold text-sm">24/7 Care</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Banner */}
      <section className="py-6 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-white">
            {[
              { icon: Clock, text: 'Open 24/7 Emergency' },
              { icon: Phone, text: 'Free Consultation' },
              { icon: Shield, text: 'Certified Specialists' },
              { icon: MapPin, text: '3 Locations' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-sm font-medium">
                <Icon size={16} className="text-blue-200" /> {text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <SectionHeader badge="What We Offer" title="Comprehensive Medical Services" subtitle="From routine check-ups to complex surgeries, we offer a full range of medical services." />
            <Link href="/services" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap">
              All Services <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(s => <ServiceCard key={s.title} {...s} />)}
          </div>
        </div>
      </section>

    <section
      ref={ref}
      className="py-7 bg-blue-600 dark:bg-blue-700 px-4"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((s, i) => {
          const Icon = s.icon;
          const numericValue = parseInt(s.value.replace(/[^0-9]/g, ""));
          const hasPlus = s.value.includes("+");

          return (
            <motion.div
              key={s.label}
              className="text-center text-white"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="flex justify-center mb-2">
                <Icon className="w-8 h-8 text-blue-200" />
              </div>

              <div className="font-display text-4xl font-bold mb-1">
                {isInView && (
                  <CountUp
                    key={key + s.label} // 👈 forces restart
                    end={numericValue}
                    duration={2}
                    separator=","
                  />
                )}
                {hasPlus && "+"}
              </div>

              <div className="text-blue-200 text-sm">{s.label}</div>
            </motion.div>
          );
        })}
      </div>
    </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="rounded-3xl overflow-hidden aspect-4/3 shadow-2xl">
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop" alt="Hospital" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-xl border border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-1 mb-2">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <div className="font-display font-bold text-2xl text-gray-900 dark:text-white">4.9/5</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs">Patient Satisfaction</div>
            </div>
          </div>
          <div>
            <SectionHeader badge="Why MediCore" title="Caring Health is Important Than All" subtitle="We combine cutting-edge technology with compassionate care to deliver the best possible outcomes for every patient." />
            <div className="space-y-4">
              {[
                { icon: Shield, title: 'Board-Certified Specialists', desc: 'All our doctors are board-certified with extensive training in their respective fields.' },
                { icon: Zap, title: 'Advanced Technology', desc: 'We use the latest medical technology and evidence-based treatments for optimal outcomes.' },
                { icon: Heart, title: 'Patient-Centered Care', desc: 'Your comfort and recovery are our top priorities throughout your care journey.' },
                { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock emergency care and patient support whenever you need it.' },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-0.5">{title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <SectionHeader badge="Our Team" title="Meet Our Expert Doctors" subtitle="Highly qualified specialists dedicated to your health and wellbeing." />
            <Link href="/doctors" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap">
              All Doctors <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {doctors.map(d => <DoctorCard key={d.name} {...d} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Patient Stories" title="What Our Patients Say" center />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map(t => <TestimonialCard key={t.name} {...t} />)}
          </div>
        </div>
      </section>

      {/* Appointment CTA */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-semibold rounded-full mb-4 uppercase tracking-wider">
            Book Now
          </span>
          <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">Make an Appointment</h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-8">Schedule your visit with our specialists. Choose your preferred date, time, and doctor.</p>
          <Link href="/appointments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:scale-105 text-lg">
            <Calendar size={20} /> Book an Appointment <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Blog */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <SectionHeader badge="Latest News" title="Medical Insights &amp; Updates" subtitle="Stay informed with the latest in healthcare and wellness." />
            <Link href="/blog" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm hover:gap-3 transition-all whitespace-nowrap">
              All Posts <ArrowRight size={16} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogs.map(b => <BlogCard key={b.title} {...b} />)}
          </div>
        </div>
      </section>
    </div>
  )
}
