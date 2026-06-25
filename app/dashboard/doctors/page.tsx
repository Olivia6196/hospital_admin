"use client";

import Header from '@/app/components/Header';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { CheckCircle2, XCircle, Mail, UserPlus, Clock } from 'lucide-react';
import { toast } from 'react-toastify';

interface StaffMember {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  department: string;
  yearsOfExperience: number;
  school: string;
  bio: string;
  photoDataUrl?: string;
  status: string;
  submittedAt: string;
}

const DOCTORS_PER_PAGE = 9;

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<StaffMember[]>([]);
  const [pendingApplications, setPendingApplications] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const observerTarget = useRef<HTMLDivElement>(null);
const fetchInitialData = async () => {
  try {
    setLoading(true);
    
    // Fetch ALL applications for pending (we need to filter nurses etc. on frontend here)
    const allRes = await fetch('/api/staff-applications');
    const allApps: StaffMember[] = await allRes.json();

    const pendingDoctors = allApps.filter(
      app => app.role === 'doctor' && app.status === 'pending'
    );

    setPendingApplications(pendingDoctors);

    // Load first page of APPROVED DOCTORS only
    await loadMoreDoctors(1, true);
  } catch (error) {
    console.error('Failed to fetch doctors:', error);
  } finally {
    setLoading(false);
  }
};

const loadMoreDoctors = async (currentPage: number, reset = false) => {
  if (loadingMore) return;

  setLoadingMore(true);
  try {
    const skip = (currentPage - 1) * DOCTORS_PER_PAGE;
    
    const res = await fetch(
      `/api/staff-applications?role=doctor&status=approved&limit=${DOCTORS_PER_PAGE}&skip=${skip}`
    );

    if (!res.ok) throw new Error('Failed to fetch doctors');

    const newDoctors: StaffMember[] = await res.json();

    // Extra safety filter on frontend
    const validDoctors = newDoctors.filter(d => d.role === 'doctor');

    if (reset) {
      setDoctors(validDoctors);
    } else {
      setDoctors(prev => [...prev, ...validDoctors]);
    }

    setHasMore(newDoctors.length === DOCTORS_PER_PAGE);
    setPage(currentPage);
  } catch (error) {
    console.error('Failed to load more doctors:', error);
  } finally {
    setLoadingMore(false);
  }
};

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting && hasMore && !loadingMore && !loading) {
      loadMoreDoctors(page + 1);
    }
  }, [hasMore, loadingMore, loading, page]);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '200px',
      threshold: 0.1,
    });

    const currentTarget = observerTarget.current;
    if (currentTarget) observer.observe(currentTarget);

    return () => {
      if (currentTarget) observer.unobserve(currentTarget);
    };
  }, [handleObserver]);

  const updateStatus = async (id: string, newStatus: 'approved' | 'cancelled') => {
    setActionLoading(id);
    try {
      const res = await fetch(`/api/staff-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (res.ok) {
        await fetchInitialData(); 
      } else {
        toast.error('Failed to update status');
      }
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    } finally {
      setActionLoading(null);
    }
  };

  const sendInterviewEmail = (email: string, name: string) => {
    toast.info(`Interview email would be sent to ${name} (${email})`);
  };

  return (
    <div className="flex flex-col gap-8 p-5 min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header 
        title="Doctors" 
        subtitle={`${doctors.length} doctors on staff`} 
      />

      {/* Pending Applications Section */}
      {pendingApplications.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Doctor Applications</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Review and approve new doctors</p>
            </div>
          </div>

          <div className="space-y-4">
            {pendingApplications.map((app) => (
              <div 
                key={app._id} 
                className="flex flex-col md:flex-row gap-4 items-start md:items-center p-5 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-brand-300 dark:hover:border-brand-700 transition-all group"
              >
                <div className="shrink-0">
                  {app.photoDataUrl ? (
                    <img 
                      src={app.photoDataUrl} 
                      alt={app.fullName} 
                      className="w-16 h-16 rounded-2xl object-cover border border-gray-200 dark:border-gray-700" 
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center">
                      <UserPlus className="w-8 h-8 text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white truncate">{app.fullName}</h3>
                    <span className="px-3 py-0.5 text-xs font-medium bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-full">Pending</span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{app.department} • {app.yearsOfExperience} years exp.</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1 line-clamp-2">{app.bio}</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto mt-4 md:mt-0">
                  <button
                    onClick={() => sendInterviewEmail(app.email, app.fullName)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium rounded-2xl border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Interview
                  </button>
                  
                  <button
                    onClick={() => updateStatus(app._id, 'approved')}
                    disabled={actionLoading === app._id}
                    className="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold rounded-2xl transition-all disabled:opacity-70"
                  >
                    {actionLoading === app._id ? '...' : <><CheckCircle2 className="w-4 h-4" /> Approve</>}
                  </button>

                  <button
                    onClick={() => updateStatus(app._id, 'cancelled')}
                    disabled={actionLoading === app._id}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-2xl transition-all"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current Doctors with Infinite Scroll */}
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Current Doctors</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {doctors.length} active
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full"></div>
          </div>
        ) : doctors.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No approved doctors yet.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {doctors.map((doctor) => (
                <div 
                  key={doctor._id} 
                  className="group bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5"
                >
                  <div className="flex items-start gap-4">
                    {doctor.photoDataUrl ? (
                      <img 
                        src={doctor.photoDataUrl} 
                        alt={doctor.fullName} 
                        className="w-20 h-20 rounded-2xl object-cover" 
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-semibold">
                        {doctor.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{doctor.fullName}</h3>
                      <p className="text-brand-600 dark:text-brand-400 font-medium">{doctor.department}</p>
                      <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <span>{doctor.yearsOfExperience} years</span>
                        <span>•</span>
                        <span>{doctor.school}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {doctor.bio}
                  </div>

                  <div className="mt-5 text-xs text-gray-400 dark:text-gray-500 flex justify-between">
                    <span>Joined {new Date(doctor.submittedAt).toLocaleDateString()}</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">Active</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Infinite Scroll Sentinel */}
            <div ref={observerTarget} className="flex justify-center py-8">
              {loadingMore && (
                <div className="flex items-center gap-3 text-gray-500">
                  <div className="animate-spin w-5 h-5 border-3 border-brand-600 border-t-transparent rounded-full"></div>
                  Loading more doctors...
                </div>
              )}
              {!hasMore && doctors.length > 0 && (
                <p className="text-gray-500 text-sm">You've reached the end</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}