'use client';
import Image from 'next/image';
import Link from 'next/link';
import { MdLogin, MdSecurity, MdSpeed, MdPeopleAlt, MdLocalHospital } from 'react-icons/md';

export default function Home() {
  return (
    <div className="min-h-screen bg-linear-to-br from-blue-950 via-indigo-950 to-purple-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size-[50px_50px] opacity-30"></div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="flex justify-between items-center px-10 py-6">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center">
              <Image 
              src="/images/hospital-logo.png" 
              alt="Hospital Logo" 
              width={24} 
              height={24} 
              />
            </div>
            <h1 className="text-4xl font-bold tracking-tight" 
                style={{ fontFamily: 'var(--font-dancing)' }}>
              MediAdmin
            </h1>
          </div>
          <div className="text-sm text-blue-300">General Hospital • Admin Portal</div>
        </nav>

        {/* Hero Section */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-6 py-2 rounded-full mb-6 border border-white/20">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Secure Admin Access</span>
            </div>

            <h1 className="text-7xl md:text-8xl font-bold leading-tight mb-6">
              Welcome to the<br />
              <span className="bg-linear-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Heart of Care
              </span>
            </h1>

            <p className="text-2xl text-blue-200 mb-10 max-w-2xl mx-auto">
              Manage patients, doctors, nurses, appointments, and hospital operations — 
              all in one powerful platform.
            </p>

            {/* Sign In Button */}
            <Link href="/login">
              <button className="group relative inline-flex items-center gap-4 bg-white text-blue-950 font-semibold text-xl px-12 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50">
                <span>Enter Admin Dashboard</span>
                <MdLogin className="text-3xl group-hover:rotate-12 transition-transform" />
              </button>
            </Link>

            <p className="text-sm text-blue-400 mt-6">Only authorized administrators can access</p>
          </div>
        </div>

        {/* Features / Trust Bar */}
        <div className="border-t border-white/10 py-12">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MdPeopleAlt size={32} />
              </div>
              <h4 className="font-semibold text-lg">20,000+ Patients</h4>
              <p className="text-blue-300 text-sm">Managed Efficiently</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MdSecurity size={32} />
              </div>
              <h4 className="font-semibold text-lg">Enterprise Security</h4>
              <p className="text-blue-300 text-sm">Role-Based Access</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MdSpeed size={32} />
              </div>
              <h4 className="font-semibold text-lg">Real-time Updates</h4>
              <p className="text-blue-300 text-sm">Live Dashboard</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4">
                <MdLocalHospital size={32} />
              </div>
              <h4 className="font-semibold text-lg">Full Hospital Control</h4>
              <p className="text-blue-300 text-sm">Doctors, Nurses & Staff</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-blue-400 text-sm border-t border-white/10">
          © 2026 MediAdmin • General Hospital Administration System
        </footer>
      </div>
    </div>
  );
}