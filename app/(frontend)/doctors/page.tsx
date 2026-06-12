"use client"
import { Star, Phone, Mail, Calendar, ChevronRight, Search, ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { useState, useMemo } from 'react'
import { PageHero } from '@/app/components/main/UI'

const DOCTORS_PER_PAGE = 12

const specialties = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Surgery', 'Ophthalmology', 'Dermatology', 'Gynecology', 'Psychiatry', 'Emergency Care', 'Dental Care']

const doctors = [
  { name: 'Dr. Sarah Johnson', specialty: 'Cardiology', rating: 4.9, experience: '12 Years', patients: 2400, image: '/images/doctor1.jfif', education: 'Harvard Medical School', bio: 'Specializing in interventional cardiology with expertise in complex coronary interventions and structural heart disease.' },
  { name: 'Dr. Michael Chen', specialty: 'Neurology', rating: 4.8, experience: '7 Years', patients: 1900, image: '/images/doctor2.jfif', education: 'Johns Hopkins University', bio: 'Expert in movement disorders and neurodegenerative diseases with a focus on Parkinson\'s disease management.' },
  { name: 'Dr. Amelia Roberts', specialty: 'Pediatrics', rating: 5.0, experience: '8 Years', patients: 1200, image: '/images/doctor3.jfif', education: 'Stanford Medical School', bio: 'Dedicated to providing comprehensive pediatric care from newborns through adolescence with a warm, family-centered approach.' },
  { name: 'Dr. James Wilson', specialty: 'Orthopedics', rating: 4.7, experience: '5 Years', patients: 1000, image: '/images/doctor4.jfif', education: 'Mayo Clinic', bio: 'Specializing in total joint replacement and sports medicine injuries with minimally invasive surgical techniques.' },
  { name: 'Dr. Priya Patel', specialty: 'Oncology', rating: 4.9, experience: '4 Years', patients: 200, image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=500&fit=crop&crop=face', education: 'Columbia University', bio: 'Leading oncologist specializing in breast and lung cancers with expertise in immunotherapy and targeted treatments.' },
  { name: 'Dr. Robert Kim', specialty: 'Surgery', rating: 4.8, experience: '9 Years', patients: 800, image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=500&fit=crop&crop=face', education: 'Yale School of Medicine', bio: 'Board-certified general and laparoscopic surgeon with expertise in minimally invasive and robotic-assisted procedures.' },
  { name: 'Dr. Linda Thompson', specialty: 'Ophthalmology', rating: 4.8, experience: '4 Years', patients: 200, image: '/images/doctor7.jfif', education: 'UCLA Medical School', bio: 'Comprehensive eye care specialist with expertise in LASIK surgery, cataract removal, and glaucoma management.' },
  { name: 'Dr. David Park', specialty: 'Dental Care', rating: 4.6, experience: '6 Years', patients: 400, image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=500&fit=crop&crop=face', education: 'University of Pennsylvania', bio: 'Focusing on preventive cardiology, echocardiography, and heart failure management in complex cardiac patients.' },
  { name: 'Dr. Dan Watson', specialty: 'Dermatology', rating: 4.7, experience: '5 Years', patients: 350, image: '/images/doctor9.jfif', education: 'Duke University', bio: 'Specializing in epilepsy management and neuro-oncology, with extensive experience in EEG diagnostics and seizure treatment plans.' },
  { name: 'Dr. Carlos Rivera', specialty: 'Surgery', rating: 4.9, experience: '3 Years', patients: 100, image: '/images/doctor10.jfif', education: 'UCLA Medical School', bio: 'Thoracic and cardiovascular surgeon specializing in valve repair, lung resections, and minimally invasive chest surgery.' },
  { name: 'Dr. Hannah Lee', specialty: 'Pediatrics', rating: 4.9, experience: '3 Years', patients: 200, image: '/images/doctor11.jfif', education: 'Stanford Medical School', bio: 'Passionate about developmental pediatrics and childhood nutrition with a gentle, play-based approach to patient care.' },
  { name: 'Dr. Nathan Brooks', specialty: 'Gynecology', rating: 4.6, experience: '5 Years', patients: 450, image: '/images/doctor13.jfif', education: 'Mayo Clinic', bio: 'Spine and disc specialist focused on non-surgical rehabilitation and advanced spinal fusion techniques for chronic pain.' },
  { name: 'Dr. Olivia Grant', specialty: 'Oncology', rating: 4.8, experience: '3 Years', patients: 100, image: '/images/doctor12.jfif', education: 'Harvard Medical School', bio: 'Hematologic oncologist with expertise in leukemia, lymphoma, and myeloma — leading trials in CAR-T cell therapy.' },
  { name: 'Dr. Kevin Osei', specialty: 'Cardiology', rating: 4.7, experience: '4 Years', patients: 250, image: '/images/doctor14.jfif', education: 'Johns Hopkins University', bio: 'Interventional cardiologist with focus on catheter-based treatments for coronary artery disease and valvular conditions.' },
  { name: 'Dr. Mei Lin', specialty: 'Ophthalmology', rating: 5.0, experience: '3 Years', patients: 70, image: '/images/doctor18.jfif', education: 'Columbia University', bio: 'Retinal disease specialist with a track record in macular degeneration treatment and complex vitreoretinal surgeries.' },
  { name: 'Dr. Thomas Adler', specialty: 'Gynecology', rating: 4.5, experience: '4 Years', patients: 100, image: '/images/doctor16.jfif', education: 'University of Michigan', bio: 'Focused on headache medicine and migraine intervention, with subspecialty training in neuroimaging and pain management.' },
  { name: 'Dr. Grace Mensah', specialty: 'Pediatrics', rating: 4.8, experience: '9 Years', patients: 2400, image: '/images/doctor23.jfif', education: 'Emory University', bio: 'Pediatric infectious disease expert with a focus on vaccine-preventable illnesses, immunology, and tropical diseases.' },
  { name: 'Dr. Alex Turner', specialty: 'Surgery', rating: 4.7, experience: '13 Years', patients: 2600, image: '/images/doctor15.jfif', education: 'Yale School of Medicine', bio: 'Colorectal surgeon specializing in laparoscopic colectomy, rectal cancer resection, and inflammatory bowel disease surgery.' },
  { name: 'Dr. Fatima Hassan', specialty: 'Psychiatry', rating: 4.9, experience: '3 Years', patients: 150, image: '/images/doctor35.jfif', education: 'Oxford University', bio: 'Gastrointestinal oncologist with expertise in colorectal, pancreatic, and hepatocellular carcinoma, including palliative care.' },
  { name: 'Dr. Samuel Okafor', specialty: 'Orthopedics', rating: 4.8, experience: '5 Years', patients: 250, image: '/images/doctor19.jfif', education: 'University of Lagos / UCSF', bio: 'Trauma and reconstructive orthopedic surgeon with expertise in complex fracture fixation and limb salvage procedures.' },
  { name: 'Dr. Jules Novak', specialty: 'Cardiology', rating: 4.7, experience: '3 Years', patients: 60, image: '/images/doctor17.jfif', education: 'University of Vienna', bio: 'Electrophysiologist specializing in cardiac arrhythmia, ablation therapy, and implantable device management (pacemakers, ICDs).' },
  { name: 'Dr. Owen Clarke', specialty: 'Psychiatry', rating: 4.6, experience: '5 Years', patients: 120, image: '/images/doctor20.jfif', education: 'University of Toronto', bio: 'Hepatobiliary surgeon specializing in liver transplantation, biliary reconstruction, and pancreatic surgery.' },
  { name: 'Dr. Nadia Sousa', specialty: 'Neurology', rating: 4.9, experience: '4 Years', patients: 350, image: '/images/doctor24.jfif', education: 'University of São Paulo / Harvard', bio: 'Stroke neurologist and neurointerventionalist, specializing in acute stroke management and cerebrovascular disease prevention.' },
  { name: 'Dr. Ian Fletcher', specialty: 'Ophthalmology', rating: 4.7, experience: '9 Years', patients: 1150, image: '/images/doctor21.jfif', education: 'University of Edinburgh', bio: 'Cornea and external eye disease specialist experienced in corneal transplantation, dry eye therapy, and refractive correction.' },
  { name: 'Dr. Yemi Adeyemi', specialty: 'Pediatrics', rating: 5.0, experience: '4 Years', patients: 600, image: '/images/doctor25.jfif', education: 'University of Ibadan / UCL', bio: 'Neonatologist specializing in premature infant care, respiratory distress syndrome, and neonatal critical care medicine.' },
  { name: 'Dr. Claire Dupont', specialty: 'Oncology', rating: 4.8, experience: '3 Years', patients: 50, image: '/images/doctor26.jfif', education: 'Paris Descartes University', bio: 'Radiation oncologist with expertise in stereotactic radiosurgery, prostate cancer brachytherapy, and pediatric tumors.' },
  { name: 'Dr. Marcus Webb', specialty: 'Orthopedics', rating: 4.6, experience: '5 Years', patients: 950, image: '/images/doctor22.jfif', education: 'University of Melbourne', bio: 'Hand and wrist surgeon specializing in carpal tunnel release, tendon repair, and microsurgical reconstruction of upper limbs.' },
  { name: 'Dr. Amanda Nwosu', specialty: 'Cardiology', rating: 4.9, experience: '3 Years', patients: 86, image: '/images/doctor40.jfif', education: 'University of Nigeria / Imperial College', bio: 'Heart failure specialist with expertise in advanced heart failure therapies, cardiac resynchronization, and device implantation.' },
  { name: 'Dr. Peter Svensson', specialty: 'Surgery', rating: 4.8, experience: '7 Years', patients: 1100, image: '/images/doctor29.jfif', education: 'Karolinska Institute', bio: 'Vascular surgeon with extensive experience in aortic aneurysm repair, carotid endarterectomy, and peripheral artery disease.' },
  { name: 'Dr. Sophie Martin', specialty: 'Psychiatry', rating: 4.7, experience: '4 Years', patients: 150, image: '/images/doctor27.jfif', education: 'McGill University', bio: 'Neurologist specializing in multiple sclerosis and demyelinating diseases, with expertise in disease-modifying therapies.' },
  { name: 'Dr. Jerome Eze', specialty: 'Pediatrics', rating: 4.8, experience: '4 Years', patients: 100, image: '/images/doctor32.jfif', education: 'University of Benin / UCH Ibadan', bio: 'Pediatric cardiologist managing congenital heart defects, arrhythmias, and Kawasaki disease in children and adolescents.' },
  { name: 'Dr. Rachel Stone', specialty: 'Dermatology', rating: 4.9, experience: '5 Years', patients: 700, image: '/images/doctor28.jfif', education: 'University of Oxford', bio: 'Pediatric ophthalmologist treating amblyopia, strabismus, and congenital eye disorders in infants and young children.' },
  { name: 'Dr. Vincent Sam', specialty: 'Oncology', rating: 4.7, experience: '5 Years', patients: 100, image: '/images/doctor30.jfif', education: 'Obafemi Awolowo University / NCI', bio: 'Surgical oncologist specializing in soft tissue sarcomas, melanoma, and hepatic metastasectomy for advanced cancers.' },
  { name: 'Dr. Laura Bianchi', specialty: 'Cardiology', rating: 4.8, experience: '6 Years', patients: 120, image: '/images/doctor31.jfif', education: 'University of Bologna', bio: 'Non-invasive cardiologist with expertise in cardiac imaging, stress testing, and long-term cardiovascular risk management.' },
  { name: 'Dr. Hassan Al-Farsi', specialty: 'Surgery', rating: 4.7, experience: '7 Years', patients: 200, image: '/images/doctor33.jfif', education: 'King Faisal Specialist Hospital / Johns Hopkins', bio: 'Urologic surgeon specializing in robotic prostatectomy, nephrectomy, and urinary reconstruction in complex cases.' },
  { name: 'Dr. Ingrid Halvorsen', specialty: 'Dental Care', rating: 4.9, experience: '4 Years', patients: 30, image: '/images/doctor34.jfif', education: 'University of Oslo / HSS New York', bio: 'Pediatric orthopedic surgeon specializing in scoliosis correction, club foot treatment, and limb length discrepancy.' },
  { name: 'Dr. Joy David', specialty: 'Neurology', rating: 4.6, experience: '3 Years', patients: 60, image: '/images/doctor36.jfif', education: 'University of Nigeria / UCLH', bio: 'Neurologist with interest in cognitive disorders, Alzheimer\'s disease, and memory clinic assessment and management.' },
  { name: 'Dr. Zara Ahmed', specialty: 'Pediatrics', rating: 4.9, experience: '5 Years', patients: 200, image: '/images/doctor38.jfif', education: 'Aga Khan University', bio: 'Pediatric pulmonologist managing asthma, cystic fibrosis, and sleep-disordered breathing with evidence-based protocols.' },
  { name: 'Dr. Bernard Osei', specialty: 'Psychiatry', rating: 4.7, experience: '11 Years', patients: 2200, image: '/images/doctor39.jfif', education: 'University of Ghana / Moorfields Eye Hospital', bio: 'Glaucoma specialist providing medical and surgical interventions including trabeculectomy and tube shunt implantation.' },
  { name: 'Dr. Camille Fontaine', specialty: 'Oncology', rating: 4.8, experience: '6 Years', patients: 600, image: '/images/doctor37.jfif', education: 'Institut Curie / INSERM', bio: 'Medical oncologist focusing on gynecologic cancers — cervical, ovarian, and endometrial — including fertility-sparing treatment options.' },
]


export default function DoctorsPage() {
  const [activeSpecialty, setActiveSpecialty] = useState('All')
    const [searchQuery, setSearchQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
  
    const filtered = useMemo(() => {
      const q = searchQuery.toLowerCase().trim()
      return doctors.filter(doc => {
        const matchesSpecialty = activeSpecialty === 'All' || doc.specialty === activeSpecialty
        const matchesSearch = !q || doc.name.toLowerCase().includes(q) || doc.specialty.toLowerCase().includes(q) || doc.education.toLowerCase().includes(q)
        return matchesSpecialty && matchesSearch
      })
    }, [activeSpecialty, searchQuery])
  
    const totalPages = Math.ceil(filtered.length / DOCTORS_PER_PAGE)
    const paginated = filtered.slice((currentPage - 1) * DOCTORS_PER_PAGE, currentPage * DOCTORS_PER_PAGE)
  
    const handleSpecialtyChange = (specialty: string) => {
      setActiveSpecialty(specialty)
      setCurrentPage(1)
    }
  
    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value)
      setCurrentPage(1)
    }
  
  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/doctorbg.jfif')] bg-cover bg-center relative">
        <PageHero
        title="Our Expert Doctors"
        subtitle="Meet our team of 35+ board-certified specialists dedicated to your health"
      />
      <div className="absolute inset-0 bg-black/30" />
      </div>
      
      <section className="py-8 px-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {specialties.map(s => (
                    <button
                      key={s}
                      onClick={() => handleSpecialtyChange(s)}
                      className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all ${
                        s === activeSpecialty
                          ? 'bg-blue-600 text-white shadow-sm'
                          : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search doctor or specialty..."
                    className="pl-9 pr-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
              </div>
            </section>
      
            {/* Doctors Grid */}
            <section className="py-12 px-4">
              <div className="max-w-7xl mx-auto">
                {/* Results count */}
                <div className="mb-6 flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Showing <span className="font-semibold text-gray-700 dark:text-gray-200">{paginated.length}</span> of{' '}
                    <span className="font-semibold text-gray-700 dark:text-gray-200">{filtered.length}</span> doctors
                    {activeSpecialty !== 'All' && <span> in <span className="text-blue-600 dark:text-blue-400 font-medium">{activeSpecialty}</span></span>}
                  </p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">Page {currentPage} of {totalPages || 1}</p>
                </div>
      
                {filtered.length === 0 ? (
                  <div className="text-center py-24">
                    <div className="text-5xl mb-4">🔍</div>
                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No doctors found</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Try a different name, specialty, or clear your filters.</p>
                    <button
                      onClick={() => { setActiveSpecialty('All'); setSearchQuery(''); setCurrentPage(1) }}
                      className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                      Clear filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {paginated.map(doc => (
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
                          <h3 className="font-semibold text-gray-900 dark:text-white text-base">{doc.name}</h3>
                          <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-0.5 mb-1">{doc.specialty}</p>
                          <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">{doc.bio}</p>
                          <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                            <span>{doc.patients.toLocaleString()} patients</span>
                            <span className="text-gray-300 dark:text-gray-700">|</span>
                            <span className="truncate max-w-27.5">{doc.education}</span>
                          </div>
                          <div className="flex gap-2">
                            <a href="/appointments"
                              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all">
                              <Calendar size={13} /> Book
                            </a>
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
                )}
      
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-12 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft size={16} /> Previous
                    </button>
      
                    <div className="hidden md:flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 rounded-xl text-sm font-medium transition-all ${
                            page === currentPage
                              ? 'bg-blue-600 text-white shadow-sm'
                              : 'border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>
      
                    <button
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-600 dark:text-gray-400 hover:border-blue-300 hover:text-blue-600 dark:hover:border-blue-700 dark:hover:text-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      Next <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </section>
      
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
    </div>
  )
}
