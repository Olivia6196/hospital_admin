'use client'

import { useState, useEffect } from 'react'
import Navbar from '../components/main/Navbar'
import Footer from '../components/main/Footer'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const shouldDark = stored === 'dark' || (!stored && prefersDark)

    setDark(shouldDark)
    document.documentElement.classList.toggle('dark', shouldDark)
    document.documentElement.style.colorScheme = shouldDark ? 'dark' : 'light'
  }, [])

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev

      document.documentElement.classList.toggle('dark', next)
      document.documentElement.style.colorScheme = next ? 'dark' : 'light'
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
