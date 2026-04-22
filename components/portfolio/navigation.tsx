"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, User, FolderOpen, FileText, Mail, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage, type Language } from "@/lib/language-context"
import { translations } from "@/lib/data"

interface NavigationProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

const navItems = [
  { id: "about", icon: User },
  { id: "projects", icon: FolderOpen },
  { id: "blog", icon: FileText },
  { id: "contact", icon: Mail },
]

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const handleNavClick = (sectionId: string) => {
    onSectionChange(sectionId)
    setMobileMenuOpen(false)
  }

  const toggleLanguage = () => {
    setLanguage(language === "id" ? "en" : "id")
  }

  const getNavLabel = (id: string) => {
    const key = id as keyof typeof translations.nav
    return translations.nav[key][language]
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl font-bold text-foreground"
          >
            <span className="text-primary">{"<"}</span>
            Portfolio
            <span className="text-primary">{" />"}</span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavClick(item.id)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  "flex items-center gap-2",
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="w-4 h-4" />
                {getNavLabel(item.id)}
              </motion.button>
            ))}

            {/* Language Toggle Button */}
            <motion.button
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              onClick={toggleLanguage}
              className={cn(
                "ml-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                "flex items-center gap-2",
                "bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80",
                "border border-border"
              )}
              aria-label={`Switch to ${language === "id" ? "English" : "Indonesian"}`}
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{language === "id" ? "ID" : "EN"}</span>
            </motion.button>
          </div>

          {/* Mobile Menu Button & Language Toggle */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg hover:bg-accent transition-colors flex items-center gap-1 border border-border"
              aria-label={`Switch to ${language === "id" ? "English" : "Indonesian"}`}
            >
              <Globe className="w-5 h-5" />
              <span className="text-sm font-semibold">{language === "id" ? "ID" : "EN"}</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-accent transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-background"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg text-left font-medium transition-all duration-200",
                    "flex items-center gap-3",
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                  {getNavLabel(item.id)}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
