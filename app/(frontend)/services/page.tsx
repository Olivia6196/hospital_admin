import { Heart, Brain, Bone, Baby, Microscope, Zap, Eye, Wind, Activity, Pill, Stethoscope, Shield, CheckCircle, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { PageHero, SectionHeader } from '@/app/components/main/UI'
import Image from 'next/image'

const allServices = [
  {
    id: 'emergency', icon: Zap, color: 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400',
    title: 'Emergency Care', desc: 'Our 24/7 emergency department is equipped with the latest technology and staffed by experienced emergency physicians and nurses ready to handle any medical crisis.',
    features: ['24/7 Availability', 'Rapid Response Team', 'Critical Care Unit', 'Trauma Center'],
    image: '/images/service.jpg'
  },
  {
    id: 'cardiology', icon: Heart, color: 'bg-red-50 dark:bg-red-950/50 text-red-600 dark:text-red-400',
    title: 'Cardiology', desc: 'Our cardiac care team offers comprehensive services for all heart-related conditions, from preventive care to complex interventional procedures.',
    features: ['EKG & Echocardiogram', 'Cardiac Catheterization', 'Electrophysiology', 'Heart Failure Clinic'],
    image: '/images/news_one.jpg'
  },
  {
    id: 'neurology', icon: Brain, color: 'bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400',
    title: 'Neurology', desc: 'Expert neurological care for disorders of the brain, spine, and nervous system using advanced diagnostic imaging and treatment techniques.',
    features: ['MRI & CT Scanning', 'Epilepsy Management', 'Stroke Center', 'Movement Disorders'],
    image: '/images/news_five.webp'
  },
  {
    id: 'surgery', icon: Stethoscope, color: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
    title: 'General Surgery', desc: 'Our surgeons are skilled in a wide range of procedures including minimally invasive laparoscopic surgery and robotic-assisted surgery.',
    features: ['Minimally Invasive', 'Robotic Surgery', 'Day Surgery', 'Pre/Post-Op Care'],
    image: '/images/surgery.jpg'
  },
  {
    id: 'orthopedics', icon: Bone, color: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400',
    title: 'Orthopedics', desc: 'Comprehensive care for musculoskeletal conditions including joint replacement, sports medicine, and spinal surgery.',
    features: ['Joint Replacement', 'Sports Medicine', 'Spinal Surgery', 'Physical Therapy'],
    image: '/images/orthpedics.jpg'
  },
  {
    id: 'pediatrics', icon: Baby, color: 'bg-green-50 dark:bg-green-950/50 text-green-600 dark:text-green-400',
    title: 'Pediatrics', desc: 'Specialized healthcare for infants, children, and adolescents in a child-friendly environment with compassionate specialists.',
    features: ['Well-Child Visits', 'Vaccinations', 'Developmental Screening', 'Pediatric ER'],
    image: '/images/news_three.jpg'
  },
  {
    id: 'diagnostics', icon: Microscope, color: 'bg-cyan-50 dark:bg-cyan-950/50 text-cyan-600 dark:text-cyan-400',
    title: 'Diagnostics & Lab', desc: 'State-of-the-art diagnostic facilities offering comprehensive laboratory tests and advanced imaging services.',
    features: ['Blood & Urine Tests', 'MRI & CT Scan', 'X-Ray & Ultrasound', 'Pathology'],
    image: '/images/clinic6.webp'
  },
  {
    id: 'ophthalmology', icon: Eye, color: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400',
    title: 'Ophthalmology', desc: 'Complete eye care services from routine eye exams and glasses prescriptions to complex surgical procedures.',
    features: ['Eye Exams', 'LASIK Surgery', 'Cataract Surgery', 'Glaucoma Treatment'],
    image: '/images/eye.jpg'
  },
  {
    id: 'pulmonology', icon: Wind, color: 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400',
    title: 'Pulmonology', desc: 'Expert care for respiratory conditions including asthma, COPD, sleep disorders, and lung cancer treatment.',
    features: ['Pulmonary Function', 'Sleep Studies', 'Bronchoscopy', 'Ventilator Management'],
    image: '/images/breathe.jpg'
  },
]

export default function ServicesPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/dashboard_img.webp')] bg-cover bg-center relative">
        <PageHero
          title="Our Medical Services"
          subtitle="Comprehensive healthcare services delivered by expert specialists"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Service Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="What We Offer" title="Comprehensive Medical Care" subtitle="From routine check-ups to complex procedures, our specialists provide expert care across all medical disciplines."/>

          {allServices.map((svc, i) => (
            <div key={svc.id} id={svc.id} className={`grid lg:grid-cols-2 gap-12 items-center mb-24 ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <div className={i % 2 !== 0 ? 'order-last lg:order-first' : ''}>
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${svc.color} mb-5`}>
                  <svc.icon size={26} />
                </div>
                <h2 className="font-display text-3xl font-bold text-gray-900 dark:text-white mb-4">{svc.title}</h2>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">{svc.desc}</p>
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {svc.features.map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                      <CheckCircle size={16} className="text-blue-600 dark:text-blue-400 shrink-0" /> {f}
                    </div>
                  ))}
                </div>
                <Link href="/appointments"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105">
                  Book Consultation <ArrowRight size={16} />
                </Link>
              </div>
              <div className={`rounded-3xl overflow-hidden aspect-4/3 shadow-xl ${i % 2 !== 0 ? 'order-first lg:order-last' : ''}`}>
                <Image width={600} height={400} src={svc.image} alt={svc.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-blue-600 dark:bg-blue-700">
        <div className="max-w-3xl mx-auto text-center text-white">
          <h2 className="font-display text-4xl font-bold mb-4">Need Help Choosing a Service?</h2>
          <p className="text-blue-100 text-lg mb-8">Our medical staff can help you determine which service is right for your needs. Book a free consultation today.</p>
          <Link href="/appointments"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all hover:scale-105">
            Book Free Consultation <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </div>
  )
}
