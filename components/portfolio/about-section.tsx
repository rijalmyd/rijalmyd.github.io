"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import {
  MapPin,
  Calendar,
  Instagram,
  Youtube,
  Github,
  Linkedin,
  Download,
  Code2,
  ChevronDown,
} from "lucide-react"
import { profile, socialLinks, translations, getText } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// Medium icon component (not in Lucide)
function MediumIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42zM24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  )
}

const socialIcons = [
  { icon: Instagram, href: socialLinks.instagram, label: "Instagram", hoverColor: "hover:text-pink-500" },
  { icon: Youtube, href: socialLinks.youtube, label: "YouTube", hoverColor: "hover:text-red-500" },
  { icon: MediumIcon, href: socialLinks.medium, label: "Medium", hoverColor: "hover:text-foreground" },
  { icon: Github, href: socialLinks.github, label: "GitHub", hoverColor: "hover:text-foreground" },
  { icon: Linkedin, href: socialLinks.linkedin, label: "LinkedIn", hoverColor: "hover:text-blue-500" },
]

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

export function AboutSection() {
  const { language, t } = useLanguage()

  return (
    <div className="content">
      <article>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          {/* Profile Header */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12"
          >
            {/* Profile Image */}
            <div className="relative">
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-primary/20 shadow-xl">
                <Image
                  src={profile.profileImage}
                  alt={profile.name}
                  width={192}
                  height={192}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-primary text-primary-foreground p-2 rounded-full">
                <Code2 className="w-5 h-5" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center md:text-left flex-1">
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                {profile.name}
              </h1>
              <p className="text-xl text-primary font-medium mb-4">
                {getText(profile.title, language)}
              </p>

              {/* Location & Birth Date */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{getText(profile.birthDate, language)}</span>
                </div>
              </div>

              {/* Social Media Icons */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 rounded-full bg-accent text-muted-foreground transition-all duration-200 ${social.hoverColor} hover:scale-110 hover:shadow-lg`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bio Section */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              {getText(translations.about.aboutMe, language)}
            </h2>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {getText(profile.bio, language)}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            variants={itemVariants}
            className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-8 shadow-sm"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-1 bg-primary rounded-full" />
              {getText(translations.about.techStack, language)}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {profile.techStack}
            </p>
          </motion.div>

          {/* Download CV Button with Language Options */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center"
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="lg"
                  className="gap-2 px-8 py-6 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Download className="w-5 h-5" />
                  {getText(translations.about.downloadCv, language)}
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="w-56">
                <DropdownMenuItem asChild>
                  <a
                    href={profile.cvUrl.id}
                    download
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-red-500/10 text-red-600 flex items-center justify-center text-xs font-bold">
                      ID
                    </span>
                    <span>CV Bahasa Indonesia</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <a
                    href={profile.cvUrl.en}
                    download
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-500/10 text-blue-600 flex items-center justify-center text-xs font-bold">
                      EN
                    </span>
                    <span>CV English</span>
                  </a>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>
        </motion.div>
      </article>
    </div>
  )
}
