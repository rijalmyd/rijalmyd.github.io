"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Navigation } from "@/components/portfolio/navigation"
import { AboutSection } from "@/components/portfolio/about-section"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { BlogSection } from "@/components/portfolio/blog-section"
import { ContactSection } from "@/components/portfolio/contact-section"
import { LanguageProvider, useLanguage } from "@/lib/language-context"
import { translations, getText } from "@/lib/data"

const sections = {
  about: AboutSection,
  projects: ProjectsSection,
  blog: BlogSection,
  contact: ContactSection,
}

function PortfolioContent() {
  const [activeSection, setActiveSection] = useState("about")
  const { language } = useLanguage()

  const ActiveComponent = sections[activeSection as keyof typeof sections]

  return (
    <main className="min-h-screen bg-background">
      <Navigation
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main Content */}
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {getText(translations.footer.copyright, language)}
          </p>
        </div>
      </footer>
    </main>
  )
}

export default function PortfolioPage() {
  return (
    <LanguageProvider>
      <PortfolioContent />
    </LanguageProvider>
  )
}
