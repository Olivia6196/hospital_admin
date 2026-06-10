'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Sun, Moon, Menu, X, Phone, Mail, ChevronDown, Activity } from 'lucide-react'
import Image from 'next/image'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'All Services', href: '/services' },
      { label: 'Emergency Care', href: '/services#emergency' },
      { label: 'Surgery', href: '/services#surgery' },
      { label: 'Diagnostics', href: '/services#diagnostics' },
      { label: 'Pediatrics', href: '/services#pediatrics' },
    ],
  },
  { label: 'Doctors', href: '/doctors' },
  { label: 'Appointments', href: '/appointments' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

interface NavbarProps { dark: boolean; toggleDark: () => void }

export default function Navbar({ dark, toggleDark }: NavbarProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdown, setDropdown] = useState<string | null>(null)

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="bg-blue-600 dark:bg-blue-700 text-white text-sm py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5"><Phone size={13} /> +1 (800) 123-4567</span>
            <span className="flex items-center gap-1.5"><Mail size={13} /> info@medicore.hospital</span>
          </div>
          <span className="text-blue-200 text-xs">Emergency: Available 24/7</span>
        </div>
      </div>

      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-white/75 flex items-center justify-center shadow shadow-blue-200 dark:white group-hover:scale-105 transition-transform">
            <Image src="/images/hospital-logo.png" alt="MediCore Logo" width={18} height={18} className="w-6 h-6" />
          </div>
          <div>
            <p className="font-display font-800 text-lg text-gray-900 dark:text-white leading-tight">MediCore</p>
            <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium tracking-wider uppercase leading-tight">Hospital</p>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(link => (
            <li key={link.href} className="relative"
              onMouseEnter={() => link.children && setDropdown(link.label)}
              onMouseLeave={() => setDropdown(null)}>
              <Link
                href={link.href}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  pathname === link.href
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950'
                    : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50'
                }`}>
                {link.label}
                {link.children && <ChevronDown size={14} className={`transition-transform ${dropdown === link.label ? 'rotate-180' : ''}`} />}
              </Link>
              {link.children && dropdown === link.label && (
                <div className="absolute top-full left-0 mt-1 w-52 bg-white dark:bg-gray-900 rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 animate-fade-in">
                  {link.children.map(child => (
                    <Link key={child.href} href={child.href}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggleDark}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle theme">
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link href="/appointments"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg hover:rounded-full shadow-md shadow-blue-200 dark:shadow-blue-900/50 transition-all hover:scale-105 active:scale-95">
            Book Appointment
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 py-4 px-4">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                pathname === link.href
                  ? 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900'
              }`}>
              {link.label}
            </Link>
          ))}
          <Link href="/appointments" onClick={() => setMobileOpen(false)}
            className="mt-3 flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-xl">
            Book Appointment
          </Link>
        </div>
      )}
    </header>
  )
}
