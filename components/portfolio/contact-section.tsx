"use client"

import { motion } from "framer-motion"
import { Calendar, Briefcase, Mail, ArrowRight } from "lucide-react"
import { contactInfo, translations, getText } from "@/lib/data"
import { useLanguage } from "@/lib/language-context"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function ContactSection() {
  const { language } = useLanguage()

  const contactCards = [
    {
      id: "meeting",
      title: getText(translations.contact.meeting.title, language),
      description: getText(translations.contact.meeting.description, language),
      cta: getText(translations.contact.meeting.cta, language),
      icon: Calendar,
      href: contactInfo.meetingLink,
      color: "bg-blue-500/10 text-blue-600 dark:text-blue-400",
      hoverColor: "hover:border-blue-500/50",
    },
    {
      id: "freelance",
      title: getText(translations.contact.freelance.title, language),
      description: getText(translations.contact.freelance.description, language),
      cta: getText(translations.contact.freelance.cta, language),
      icon: Briefcase,
      href: `mailto:${contactInfo.freelanceEmail}?subject=Freelance%20Project%20Proposal`,
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      hoverColor: "hover:border-emerald-500/50",
    },
    {
      id: "email",
      title: getText(translations.contact.email.title, language),
      description: getText(translations.contact.email.description, language),
      cta: getText(translations.contact.email.cta, language),
      icon: Mail,
      href: `mailto:${contactInfo.generalEmail}`,
      color: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
      hoverColor: "hover:border-orange-500/50",
    },
  ]

  return (
    <div className="content">
      <article>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {getText(translations.contact.title, language)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getText(translations.contact.description, language)}
            </p>
          </div>

          {/* Contact Cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {contactCards.map((card) => (
              <motion.a
                key={card.id}
                href={card.href}
                target={card.id === "meeting" ? "_blank" : undefined}
                rel={card.id === "meeting" ? "noopener noreferrer" : undefined}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className={`group flex flex-col items-center text-center p-8 bg-card border border-border rounded-2xl shadow-sm transition-all duration-200 ${card.hoverColor}`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${card.color}`}
                >
                  <card.icon className="w-8 h-8" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {card.description}
                </p>

                {/* CTA */}
                <div className="flex items-center gap-2 text-sm font-medium text-primary mt-auto group-hover:gap-3 transition-all">
                  <span>{card.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <p className="text-sm text-muted-foreground">
              {getText(translations.contact.responseTime, language)}
            </p>
          </motion.div>
        </motion.div>
      </article>
    </div>
  )
}
