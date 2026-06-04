"use client"

import React, { createContext, useEffect, useState, ReactNode } from "react"

export type ThemeContextType = {
  dark: boolean
  toggleDark: () => void
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const isDark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)

    setDark(isDark)
  }, [])

  useEffect(() => {
    console.log('Dark state changed to:', dark)
    document.documentElement.classList.toggle('dark', dark)
    console.log('HTML element classes:', document.documentElement.className)
  }, [dark])

  const toggleDark = () => {
    setDark(prev => {
      const next = !prev
      localStorage.setItem('theme', next ? 'dark' : 'light')
      console.log('Theme toggled to:', next ? 'dark' : 'light')
      return next
    })
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleDark }}>
      {children}
    </ThemeContext.Provider>
  )
}
