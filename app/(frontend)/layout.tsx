'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/main/Navbar'
import Footer from '../components/main/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev
      document.documentElement.classList.toggle('dark', next)
      localStorage.setItem('theme', next ? 'dark' : 'light')
      return next
    })
  }

  return (
      <>
        <Navbar dark={dark} toggleDark={toggleDark} />
        <main>{children}</main>
        <Footer />
      </>
  )
}
