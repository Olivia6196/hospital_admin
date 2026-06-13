import Link from 'next/link'
import { Activity, Phone, Mail, MapPin, ArrowRight, Share2, LogIn } from 'lucide-react'

const quickLinks = ['About Us', 'Services', 'Doctors', 'Appointments', 'Pricing', 'Blog', 'Contact']
const services = ['Emergency Care', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Oncology', 'Surgery']

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-white">
      {/* CTA Banner */}
      <div className="bg-blue-600 py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">Need Emergency Care?</h3>
            <p className="text-blue-100 mt-1">Our emergency team is available 24/7 to help you.</p>
          </div>
          <div className="flex gap-4">
            <a href="tel:+18001234567"
              className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all">
              <Phone size={18} /> Call Now
            </a>
            <Link href="/appointments"
              className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold rounded-xl hover:bg-blue-800 border border-blue-500 transition-all">
              Book Online
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
              <Activity size={20} className="text-white" />
            </div>
            <div>
              <div className="font-display font-bold text-lg text-white leading-tight">MediCore</div>
              <div className="text-[10px] text-blue-400 font-medium tracking-wider uppercase leading-tight">Hospital</div>
            </div>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed mb-5">
            Providing world-class healthcare with compassion and innovation since 1985. Your health is our priority.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-9 h-9 rounded-lg bg-gray-800 hover:bg-blue-600 flex items-center justify-center text-gray-400 hover:text-white transition-all" title="Share">
              <Share2 size={16} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Quick Links</h4>
          <ul className="space-y-2.5">
            {quickLinks.map(link => (
              <li key={link}>
                <Link href={`/${link.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-2 transition-colors group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {link}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Our Services</h4>
          <ul className="space-y-2.5">
            {services.map(s => (
              <li key={s}>
                <Link href="/services"
                  className="text-gray-400 hover:text-blue-400 text-sm flex items-center gap-2 transition-colors group">
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                  {s}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display font-semibold text-white mb-5 text-base">Contact Info</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={15} className="text-blue-400" />
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">123 Medical Center Drive<br/>New York, NY 10001</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                <Phone size={15} className="text-blue-400" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">+1 (800) 123-4567</p>
                <p className="text-gray-500 text-xs">Mon–Sat: 8am – 8pm</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-600/20 flex items-center justify-center shrink-0">
                <Mail size={15} className="text-blue-400" />
              </div>
              <p className="text-gray-400 text-sm">info@medicore.hospital</p>
            </div>
            </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 py-5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-gray-500">
          <p>© 2026 MediCore Hospital. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-300 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
