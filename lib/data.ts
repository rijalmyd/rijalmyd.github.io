// ============================================
// PORTFOLIO DATA - Edit this file to customize your content
// ============================================

import type { Language } from "./language-context"

// Profile Information
export const profile = {
  name: "Rijal Muhyidin",
  title: {
    id: "Senior Mobile Developer",
    en: "Senior Mobile Developer",
  },
  location: "Palembang, Indonesia",
  birthDate: {
    id: "7 Oktober 2001",
    en: "October 7, 2001",
  },
  profileImage: "/images/profile.jpg", // Add your profile image to public/images/
  bio: {
    id: `Seorang Mobile Developer berpengalaman dengan fokus pada pengembangan aplikasi native berkualitas tinggi. 
Mengutamakan performa optimal dan pengalaman pengguna (UI/UX) yang mulus. 
Berpengalaman dalam membangun aplikasi yang scalable dan maintainable dengan clean architecture.`,
    en: `An experienced Mobile Developer focused on building high-quality native applications. 
Prioritizing optimal performance and seamless user experience (UI/UX). 
Experienced in building scalable and maintainable applications with clean architecture.`,
  },
  techStack: "Kotlin, Swift, Compose Multiplatform, Next.js, Node.js, Prisma, PostgreSQL, Machine Learning",
  cvUrl: {
    id: "/cv/resume-id.pdf", // Indonesian CV
    en: "/cv/resume-en.pdf", // English CV
  },
}

// Social Media Links
export const socialLinks = {
  instagram: "https://instagram.com/rijal.myd",
  youtube: "https://youtube.com/@yourchannel",
  medium: "https://medium.com/@yourusername",
  github: "https://github.com/rijalmyd",
  linkedin: "https://linkedin.com/in/rijalmyd",
}

// Projects Data
export type ProjectCategory = "all" | "android" | "ios" | "backend" | "web" | "ml"

export interface Project {
  id: string
  title: string
  description: {
    id: string
    en: string
  }
  year: number
  category: ProjectCategory[]
  thumbnail: string
  images: string[] // 1-5 images for carousel
  platforms: ("android" | "ios")[]
  links: {
    playStore?: string
    appStore?: string
    github?: string
    web?: string
  }
}

export const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Mobile App",
    description: {
      id: "Aplikasi e-commerce lengkap dengan fitur keranjang belanja, pembayaran, dan tracking pesanan.",
      en: "Complete e-commerce app with shopping cart, payment, and order tracking features.",
    },
    year: 2024,
    category: ["android", "ios"],
    thumbnail: "/images/projects/ecommerce-thumb.jpg",
    images: [
      "/images/projects/ecommerce-1.jpg",
      "/images/projects/ecommerce-2.jpg",
      "/images/projects/ecommerce-3.jpg",
    ],
    platforms: ["android", "ios"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.example",
      appStore: "https://apps.apple.com/app/id123456",
      github: "https://github.com/yourusername/ecommerce-app",
    },
  },
  {
    id: "project-2",
    title: "Fitness Tracker",
    description: {
      id: "Aplikasi pelacak kebugaran dengan integrasi wearable dan analitik kesehatan.",
      en: "Fitness tracking app with wearable integration and health analytics.",
    },
    year: 2023,
    category: ["android"],
    thumbnail: "/images/projects/fitness-thumb.jpg",
    images: [
      "/images/projects/fitness-1.jpg",
      "/images/projects/fitness-2.jpg",
    ],
    platforms: ["android"],
    links: {
      playStore: "https://play.google.com/store/apps/details?id=com.fitness",
      github: "https://github.com/yourusername/fitness-tracker",
    },
  },
  {
    id: "project-3",
    title: "Task Management API",
    description: {
      id: "REST API untuk manajemen tugas dengan autentikasi JWT dan real-time notifications.",
      en: "REST API for task management with JWT authentication and real-time notifications.",
    },
    year: 2023,
    category: ["backend"],
    thumbnail: "/images/projects/api-thumb.jpg",
    images: [
      "/images/projects/api-1.jpg",
    ],
    platforms: [],
    links: {
      github: "https://github.com/yourusername/task-api",
      web: "https://api-docs.example.com",
    },
  },
  {
    id: "project-4",
    title: "Portfolio Website",
    description: {
      id: "Website portfolio modern dengan Next.js dan Tailwind CSS.",
      en: "Modern portfolio website with Next.js and Tailwind CSS.",
    },
    year: 2024,
    category: ["web"],
    thumbnail: "/images/projects/portfolio-thumb.jpg",
    images: [
      "/images/projects/portfolio-1.jpg",
    ],
    platforms: [],
    links: {
      github: "https://github.com/yourusername/portfolio",
      web: "https://yourportfolio.com",
    },
  },
  {
    id: "project-5",
    title: "Image Classification Model",
    description: {
      id: "Model machine learning untuk klasifikasi gambar produk e-commerce.",
      en: "Machine learning model for e-commerce product image classification.",
    },
    year: 2022,
    category: ["ml"],
    thumbnail: "/images/projects/ml-thumb.jpg",
    images: [
      "/images/projects/ml-1.jpg",
      "/images/projects/ml-2.jpg",
    ],
    platforms: [],
    links: {
      github: "https://github.com/yourusername/image-classifier",
    },
  },
  {
    id: "project-6",
    title: "iOS Finance App",
    description: {
      id: "Aplikasi keuangan pribadi untuk iOS dengan widget dan integrasi Apple Pay.",
      en: "Personal finance app for iOS with widgets and Apple Pay integration.",
    },
    year: 2024,
    category: ["ios"],
    thumbnail: "/images/projects/finance-thumb.jpg",
    images: [
      "/images/projects/finance-1.jpg",
      "/images/projects/finance-2.jpg",
      "/images/projects/finance-3.jpg",
    ],
    platforms: ["ios"],
    links: {
      appStore: "https://apps.apple.com/app/id789012",
    },
  },
]

// Blog Posts Data
export type BlogPlatform = "medium" | "kompasiana"

export interface BlogPost {
  id: string
  title: {
    id: string
    en: string
  }
  platform: BlogPlatform
  topic: string
  date: string
  thumbnail: string
  url: string
}

export const blogPosts: BlogPost[] = [
  {
    id: "blog-1",
    title: {
      id: "Membangun Aplikasi Android Modern dengan Jetpack Compose",
      en: "Building Modern Android Apps with Jetpack Compose",
    },
    platform: "medium",
    topic: "android",
    date: "2024-03-15",
    thumbnail: "/images/blog/compose-thumb.jpg",
    url: "https://medium.com/@yourusername/jetpack-compose-guide",
  },
  {
    id: "blog-2",
    title: {
      id: "Best Practices untuk Clean Architecture di iOS",
      en: "Best Practices for Clean Architecture in iOS",
    },
    platform: "medium",
    topic: "ios",
    date: "2024-02-20",
    thumbnail: "/images/blog/ios-arch-thumb.jpg",
    url: "https://medium.com/@yourusername/ios-clean-architecture",
  },
  {
    id: "blog-3",
    title: {
      id: "Mengoptimalkan Performa Aplikasi Mobile",
      en: "Optimizing Mobile App Performance",
    },
    platform: "kompasiana",
    topic: "android",
    date: "2024-01-10",
    thumbnail: "/images/blog/perf-thumb.jpg",
    url: "https://kompasiana.com/yourusername/optimizing-mobile-performance",
  },
  {
    id: "blog-4",
    title: {
      id: "Pengenalan Machine Learning untuk Developer Mobile",
      en: "Introduction to Machine Learning for Mobile Developers",
    },
    platform: "medium",
    topic: "ml",
    date: "2023-12-05",
    thumbnail: "/images/blog/ml-intro-thumb.jpg",
    url: "https://medium.com/@yourusername/ml-for-mobile-devs",
  },
  {
    id: "blog-5",
    title: {
      id: "Membangun REST API dengan Node.js dan Prisma",
      en: "Building REST API with Node.js and Prisma",
    },
    platform: "medium",
    topic: "backend",
    date: "2023-11-15",
    thumbnail: "/images/blog/nodejs-thumb.jpg",
    url: "https://medium.com/@yourusername/nodejs-prisma-api",
  },
]

// Contact Information
export const contactInfo = {
  meetingLink: "https://calendar.google.com/calendar/appointments/schedules/your-schedule-id",
  freelanceEmail: "freelance@youremail.com",
  generalEmail: "hello@youremail.com",
}

// Category Labels (for display)
export const categoryLabels: Record<ProjectCategory, { id: string; en: string }> = {
  all: { id: "Semua", en: "All" },
  android: { id: "Android App", en: "Android App" },
  ios: { id: "iOS App", en: "iOS App" },
  backend: { id: "Backend", en: "Backend" },
  web: { id: "Web", en: "Web" },
  ml: { id: "Machine Learning", en: "Machine Learning" },
}

export const blogTopics: { value: string; label: { id: string; en: string } }[] = [
  { value: "all", label: { id: "Semua Topik", en: "All Topics" } },
  { value: "android", label: { id: "Android", en: "Android" } },
  { value: "ios", label: { id: "iOS", en: "iOS" } },
  { value: "backend", label: { id: "Backend", en: "Backend" } },
  { value: "ml", label: { id: "Machine Learning", en: "Machine Learning" } },
  { value: "web", label: { id: "Web", en: "Web" } },
]

// UI Translations
export const translations = {
  nav: {
    about: { id: "Tentang", en: "About Me" },
    projects: { id: "Proyek", en: "Projects" },
    blog: { id: "Blog", en: "Blog" },
    contact: { id: "Kontak", en: "Contact" },
  },
  about: {
    aboutMe: { id: "Tentang Saya", en: "About Me" },
    techStack: { id: "Tech Stack", en: "Tech Stack" },
    downloadCv: { id: "Download CV / Resume", en: "Download CV / Resume" },
  },
  projects: {
    title: { id: "Showcase Proyek", en: "Projects Showcase" },
    description: {
      id: "Koleksi proyek-proyek yang telah saya kerjakan, dari aplikasi mobile hingga backend dan machine learning.",
      en: "A collection of projects I've worked on, from mobile apps to backend and machine learning.",
    },
    byYear: { id: "Berdasarkan Tahun", en: "By Year" },
    byPlatform: { id: "Berdasarkan Platform", en: "By Platform" },
    noProjects: { id: "Tidak ada proyek dalam kategori ini.", en: "No projects in this category." },
  },
  blog: {
    title: { id: "Blog & Artikel", en: "Blog & Articles" },
    description: {
      id: "Berbagi pengetahuan dan pengalaman seputar pengembangan aplikasi mobile dan teknologi.",
      en: "Sharing knowledge and experience about mobile app development and technology.",
    },
    newest: { id: "Terbaru", en: "Newest" },
    oldest: { id: "Terlama", en: "Oldest" },
    noArticles: { id: "Tidak ada artikel dalam topik ini.", en: "No articles in this topic." },
  },
  contact: {
    title: { id: "Hubungi Saya", en: "Contact Me" },
    description: {
      id: "Saya selalu terbuka untuk peluang baru, kolaborasi proyek, atau sekadar berdiskusi tentang teknologi.",
      en: "I'm always open to new opportunities, project collaborations, or just discussing technology.",
    },
    meeting: {
      title: { id: "Jadwalkan Meeting", en: "Book a Meeting" },
      description: {
        id: "Jadwalkan meeting untuk diskusi proyek atau konsultasi teknis.",
        en: "Schedule a meeting for project discussion or technical consultation.",
      },
      cta: { id: "Jadwalkan Sekarang", en: "Schedule Now" },
    },
    freelance: {
      title: { id: "Proposal Freelance", en: "Freelance Proposal" },
      description: {
        id: "Tertarik untuk berkolaborasi? Kirim proposal proyek freelance Anda.",
        en: "Interested in collaborating? Send your freelance project proposal.",
      },
      cta: { id: "Kirim Proposal", en: "Send Proposal" },
    },
    email: {
      title: { id: "Tulis Email", en: "Write an Email" },
      description: {
        id: "Ada pertanyaan atau ingin menyapa? Kirim email kapan saja.",
        en: "Have a question or want to say hi? Send an email anytime.",
      },
      cta: { id: "Kirim Email", en: "Send Email" },
    },
    responseTime: {
      id: "Biasanya saya merespons dalam waktu 24-48 jam.",
      en: "I usually respond within 24-48 hours.",
    },
  },
  footer: {
    copyright: {
      id: "Senior Mobile Developer. Dibuat dengan Next.js & Tailwind CSS.",
      en: "Senior Mobile Developer. Built with Next.js & Tailwind CSS.",
    },
  },
}

// Helper function to get translated text
export function getText<T extends { id: string; en: string }>(
  obj: T,
  language: Language
): string {
  return obj[language]
}
