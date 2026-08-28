"use client";
import Header from '@/app/components/Header';
import React, { useEffect, useState } from 'react';
import { Users, UserCheck, Building2, Activity } from 'lucide-react';
interface Department {
  _id: string;
  name: string;
  description?: string;
  doctorCount: number;
  patientCount: number;
  category: 'Medical' | 'Other';
  color?: string;
}
export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalDoctors, setTotalDoctors] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);

  const medicalDepartments = departments.filter((department) => department.category === 'Medical');
  const otherDepartments = departments.filter((department) => department.category === 'Other');

  const fetchDepartments = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/departments');
      if (!res.ok) throw new Error('Failed to fetch');
      
      const data: Department[] = await res.json();
      setDepartments(data);

      // Calculate totals
      const totalDocs = data.reduce((sum, dept) => sum + dept.doctorCount, 0);
      const totalPats = data.reduce((sum, dept) => sum + dept.patientCount, 0);
      
      setTotalDoctors(totalDocs);
      setTotalPatients(totalPats);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  return (
    <div className="flex flex-col gap-8 p-5 min-h-screen bg-gray-50 dark:bg-gray-950">
      <Header 
        title="Departments" 
        subtitle="Hospital-wide department overview" 
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-soft border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-2xl">
              <UserCheck className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalDoctors}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Doctors</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-soft border border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-100 dark:bg-pink-900/50 rounded-2xl">
              <Users className="w-7 h-7 text-pink-600 dark:text-pink-400" />
            </div>
            <div>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalPatients}</p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Total Active Patients</p>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full"></div>
        </div>
      ) : (
        <div className="space-y-10">
          {(['Medical', 'Other'] as const).map((category) => {
            const categoryDepartments = category === 'Medical' ? medicalDepartments : otherDepartments;

            if (categoryDepartments.length === 0) return null;

            return (
              <section key={category}>
                <div className="mb-5 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{category} Departments</h2>
                    {category === 'Medical' && (
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Doctors and active patients by department
                      </p>
                    )}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {categoryDepartments.length} departments
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryDepartments.map((dept) => (
            <div
              key={dept._id}
              className="group bg-white dark:bg-gray-900 rounded-3xl shadow-soft border border-gray-200 dark:border-gray-800 p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start">
                <div className={`p-3 rounded-2xl ${dept.color || 'bg-blue-100 dark:bg-blue-900/50'}`}>
                  <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <Activity className="w-4 h-4" />
                  ACTIVE
                </div>
              </div>

              <h3 className="text-2xl font-semibold mt-6 text-gray-900 dark:text-white tracking-tight">
                {dept.name}
              </h3>

              {dept.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {dept.description}
                </p>
              )}

              {dept.category === 'Medical' && (
                <div className="mt-8 flex justify-between items-end">
                <div>
                  <div className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-emerald-600" />
                    <div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {dept.doctorCount}
                      </p>
                      <p className="text-xs text-gray-500">Doctors</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-3 justify-end">
                    <Users className="w-5 h-5 text-pink-600" />
                    <div>
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {dept.patientCount}
                      </p>
                      <p className="text-xs text-gray-500">Patients</p>
                    </div>
                  </div>
                </div>
                </div>
              )}

            </div>
          ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {!loading && departments.length === 0 && (
        <div className="text-center py-20 text-gray-500 dark:text-gray-400">
          No departments found in the system.
        </div>
      )}
    </div>
  );
}