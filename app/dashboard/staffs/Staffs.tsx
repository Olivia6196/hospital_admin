"use client";
import Header from '@/app/components/Header';
import { useEffect, useState, useRef, useCallback } from 'react';
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

const STAFFS_PER_PAGE = 9;

export default function StaffsPage() {
  const [staffs, setStaffs] = useState<StaffMember[]>([]);
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

      const allRes = await fetch('/api/staff-applications');
      const allApps: StaffMember[] = await allRes.json();

      const pendingStaff = allApps.filter(
        (app) => app.role === 'staff' && app.status === 'pending',
      );

      setPendingApplications(pendingStaff);
      await loadMoreStaffs(1, true);
    } catch (error) {
      console.error('Failed to fetch staff data:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreStaffs = async (currentPage: number, reset = false) => {
    if (loadingMore) return;

    setLoadingMore(true);
    try {
      const skip = (currentPage - 1) * STAFFS_PER_PAGE;

      const res = await fetch(
        `/api/staff-applications?role=staff&status=approved&limit=${STAFFS_PER_PAGE}&skip=${skip}`,
      );

      if (!res.ok) throw new Error('Failed to fetch staff members');

      const newStaffs: StaffMember[] = await res.json();
      const validStaffs = newStaffs.filter((s) => s.role === 'staff');

      if (reset) {
        setStaffs(validStaffs);
      } else {
        setStaffs((prev) => [...prev, ...validStaffs]);
      }

      setHasMore(newStaffs.length === STAFFS_PER_PAGE);
      setPage(currentPage);
    } catch (error) {
      console.error('Failed to load more staff members:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loadingMore && !loading) {
        loadMoreStaffs(page + 1);
      }
    },
    [hasMore, loadingMore, loading, page],
  );

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
        body: JSON.stringify({ id, status: newStatus }),
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
      <Header title="Staffs" subtitle={`${staffs.length} staff on staff`} />

      {pendingApplications.length > 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-200 dark:border-gray-800 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
              <Clock className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Pending Staff Applications</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Review and approve new team members</p>
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
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{app.bio}</p>
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
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-200 dark:border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Active Staff</h2>
          <div className="text-sm text-gray-500 dark:text-gray-400">{staffs.length} active</div>
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full"></div>
          </div>
        ) : staffs.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No approved staff members yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staffs.map((staff) => (
              <div key={staff._id} className="group bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-start gap-4">
                  {staff.photoDataUrl ? (
                    <img
                      src={staff.photoDataUrl}
                      alt={staff.fullName}
                      className="w-20 h-20 rounded-2xl object-cover"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-2xl bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-3xl font-semibold">
                      {staff.fullName
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-gray-900 dark:text-white">{staff.fullName}</h3>
                    <p className="text-brand-600 dark:text-brand-400 font-medium">{staff.department}</p>
                    <div className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <span>{staff.yearsOfExperience} years</span>
                      <span>•</span>
                      <span>{staff.school}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Role</span>
                    <span>{staff.role}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Email</span>
                    <span>{staff.email}</span>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-gray-700 dark:text-gray-300">Phone</span>
                    <span>{staff.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div ref={observerTarget} className="h-8" />

        {loadingMore && (
          <div className="flex justify-center py-8">
            <div className="animate-spin w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
