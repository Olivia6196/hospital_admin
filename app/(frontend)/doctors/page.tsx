"use client";

import { Star, Phone, Mail, Calendar, ChevronRight, Search, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useState, useMemo, useEffect } from 'react';
import { PageHero } from '@/app/components/main/UI';

const DOCTORS_PER_PAGE = 12;

const specialties = ['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Surgery', 'Ophthalmology', 'Dermatology', 'Gynecology', 'Psychiatry', 'Emergency Care', 'Dental Care'];

interface Doctor {
  _id: string;
  fullName: string;
  department: string;        // Will be used as specialty
  yearsOfExperience: number;
  school: string;
  bio: string;
  photoDataUrl?: string;
  status: string;
  submittedAt: string;
  role:string;
}

export default function DoctorsPage() {
  const [activeSpecialty, setActiveSpecialty] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch approved doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/staff-applications');
        const allApps = await res.json();

        // Only approved doctors
        const approvedDoctors = allApps.filter((app: Doctor) => 
          app.role === 'doctor' && app.status === 'approved'
        );

        setDoctors(approvedDoctors);
      } catch (error) {
        console.error('Failed to fetch doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return doctors.filter(doc => {
      const matchesSpecialty = activeSpecialty === 'All' || doc.department === activeSpecialty;
      const matchesSearch = !q || 
        doc.fullName.toLowerCase().includes(q) || 
        doc.department.toLowerCase().includes(q) || 
        doc.school.toLowerCase().includes(q) ||
        doc.bio.toLowerCase().includes(q);
      return matchesSpecialty && matchesSearch;
    });
  }, [doctors, activeSpecialty, searchQuery]);

  const totalPages = Math.ceil(filtered.length / DOCTORS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * DOCTORS_PER_PAGE, 
    currentPage * DOCTORS_PER_PAGE
  );

  const handleSpecialtyChange = (specialty: string) => {
    setActiveSpecialty(specialty);
    setCurrentPage(1);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white dark:bg-gray-950">
      <div className="bg-[url('/images/doctorbg.jpg')] bg-cover bg-center relative">
        <PageHero
          title="Our Expert Doctors"
          subtitle="Meet our team of board-certified specialists dedicated to your health"
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

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-1">No doctors found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Try a different name, specialty, or clear your filters.</p>
              <button
                onClick={() => { setActiveSpecialty('All'); setSearchQuery(''); setCurrentPage(1); }}
                className="mt-4 px-4 py-2 text-sm bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {paginated.map(doc => (
                <div key={doc._id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <div className="relative h-60 bg-linear-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-gray-900 overflow-hidden">
                    {doc.photoDataUrl ? (
                      <img 
                        src={doc.photoDataUrl} 
                        alt={doc.fullName} 
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-blue-600 to-indigo-700 text-white text-6xl font-semibold">
                        {doc.fullName.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <span className="absolute top-3 left-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-xs font-semibold px-2 py-1 rounded-full shadow-sm">
                      {doc.yearsOfExperience} Years
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-base">{doc.fullName}</h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm font-medium mt-0.5 mb-1">{doc.department}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs mb-3 leading-relaxed line-clamp-2">{doc.bio}</p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4 pb-4 border-b border-gray-100 dark:border-gray-800">
                      <span>Trained at {doc.school}</span>
                    </div>

                    <div className="flex gap-2">
                      <a href="/appointments"
                        className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-all">
                        <Calendar size={13} /> Book Appointment
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
          <Link href="/apply"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all hover:scale-105">
            Join Our Team <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}