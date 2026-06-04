import { PageHero, SectionHeader, StatCard } from '@/app/components/main/UI'
import { Users, Award, Heart, Clock, CheckCircle, Shield, Zap, Star } from 'lucide-react'
import Link from 'next/link'

const team = [
  { name: 'Dr. Patricia Moore', role: 'Chief Medical Officer', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. Robert Chang', role: 'Head of Surgery', image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. Emma Wilson', role: 'Head of Pediatrics', image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=face' },
  { name: 'Dr. David Kumar', role: 'Head of Cardiology', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=face' },
]

const milestones = [
  { year: '1985', title: 'Founded', desc: 'MediCore Hospital opened its doors with a vision to provide exceptional healthcare to the community.' },
  { year: '1995', title: 'Expansion', desc: 'Expanded to 3 locations across New York, serving over 50,000 patients annually.' },
  { year: '2005', title: 'Innovation', desc: 'Introduced state-of-the-art robotic surgery and digital health records system.' },
  { year: '2015', title: 'Excellence Award', desc: 'Awarded the National Healthcare Excellence Award for patient outcomes.' },
  { year: '2024', title: 'Digital Health', desc: 'Launched telemedicine platform, bringing expert care to patients anywhere.' },
]

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <PageHero
        title="About MediCore Hospital"
        subtitle="Delivering compassionate, world-class healthcare for over 35 years"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'About' }]}
      />

      {/* Mission */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <SectionHeader badge="Our Mission" title="Caring Health is Important Than All" subtitle="At MediCore, we believe that every patient deserves exceptional care delivered with empathy, expertise, and innovation. Our dedicated team of over 200 specialists works tirelessly to provide the best possible outcomes." />
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { icon: Shield, text: 'Board-Certified Doctors' },
                { icon: Heart, text: 'Patient-First Approach' },
                { icon: Zap, text: 'Advanced Technology' },
                { icon: Clock, text: '24/7 Emergency Care' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5 p-3 bg-blue-50 dark:bg-blue-950/30 rounded-xl">
                  <Icon size={18} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl overflow-hidden aspect-3/4">
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=500&h=650&fit=crop" alt="Hospital" className="w-full h-full object-cover" />
            </div>
            <div className="space-y-4 pt-8">
              <div className="rounded-2xl overflow-hidden aspect-square">
                <img src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?w=400&h=400&fit=crop" alt="Doctors" className="w-full h-full object-cover" />
              </div>
              <div className="bg-blue-600 rounded-2xl p-5 text-white">
                <div className="font-display text-3xl font-bold mb-1">35+</div>
                <div className="text-blue-200 text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900/50 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatCard value="1,500+" label="Patients Treated" icon={Users} color="blue" />
          <StatCard value="200+" label="Expert Doctors" icon={Award} color="green" />
          <StatCard value="30+" label="Departments" icon={Heart} color="purple" />
          <StatCard value="98%" label="Success Rate" icon={Star} color="orange" />
        </div>
      </section>

      {/* Facts */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Our Values" title="Facts About MediCore" center />
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Our Vision', icon: '🔭', desc: 'To be the most trusted healthcare provider, recognized for clinical excellence, patient satisfaction, and innovation in medical care.' },
              { title: 'Our Mission', icon: '💙', desc: 'To provide compassionate, high-quality healthcare services that improve the health and wellbeing of our patients and communities.' },
              { title: 'Our Values', icon: '⭐', desc: 'Integrity, Compassion, Excellence, Collaboration, and Innovation guide everything we do at MediCore Hospital.' },
            ].map(item => (
              <div key={item.title} className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-3">{item.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-4xl mx-auto">
          <SectionHeader badge="Our Journey" title="A Legacy of Healthcare Excellence" center />
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-100 dark:bg-blue-900 hidden md:block" />
            {milestones.map((m, i) => (
              <div key={m.year} className={`relative flex flex-col md:flex-row gap-6 mb-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className="md:w-1/2 flex justify-end">
                  <div className={`md:max-w-xs p-5 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm ${i % 2 !== 0 ? 'md:text-right' : ''}`}>
                    <span className="inline-block px-3 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-full mb-2">{m.year}</span>
                    <h4 className="font-display font-bold text-gray-900 dark:text-white mb-1">{m.title}</h4>
                    <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{m.desc}</p>
                  </div>
                </div>
                <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-5">
                  <div className="w-4 h-4 rounded-full bg-blue-600 border-4 border-white dark:border-gray-950 shadow-md" />
                </div>
                <div className="md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Leadership" title="Our Timetable & Leadership Team" center />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map(m => (
              <div key={m.name} className="text-center group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-shadow">
                  <img src={m.image} alt={m.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h4 className="font-display font-semibold text-gray-900 dark:text-white text-sm">{m.name}</h4>
                <p className="text-blue-600 dark:text-blue-400 text-xs font-medium mt-0.5">{m.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Our Facility" title="Our Clinic" center />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1504439468489-c8920d796a29?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop',
              'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
            ].map((src, i) => (
              <div key={i} className="rounded-2xl overflow-hidden aspect-4/3 group">
                <img src={src} alt="Clinic" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mb-4">Ready to Experience World-Class Care?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Schedule your appointment today and take the first step toward better health.</p>
          <Link href="/appointments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-200 dark:shadow-blue-900/30 transition-all hover:scale-105">
            Book an Appointment
          </Link>
        </div>
      </section>
    </div>
  )
}
