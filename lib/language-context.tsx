"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

export type Language = "id" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (id: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("id")

  // Load language preference from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem("portfolio-language") as Language
    if (savedLang && (savedLang === "id" || savedLang === "en")) {
      setLanguage(savedLang)
    }
  }, [])

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem("portfolio-language", lang)
  }

  // Translation helper function
  const t = (id: string, en: string) => {
    return language === "id" ? id : en
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
