"use client"

import { useState, useMemo, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import {
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ExternalLink,
  Github,
  Smartphone,
  X,
} from "lucide-react"
import { projects, categoryLabels, translations, getText, type ProjectCategory } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

// Platform icons
function AppleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

function PlayStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 9.99l-2.302 2.302-8.634-8.634z" />
    </svg>
  )
}

function AppStoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.624 7.222c-.876 0-2.232-.996-3.66-.96-1.884.024-3.612 1.092-4.584 2.784-1.956 3.396-.504 8.412 1.404 11.172.936 1.344 2.04 2.856 3.504 2.808 1.404-.06 1.932-.912 3.636-.912 1.692 0 2.172.912 3.66.876 1.512-.024 2.472-1.368 3.396-2.724 1.068-1.56 1.512-3.072 1.536-3.156-.036-.012-2.94-1.128-2.976-4.488-.024-2.808 2.292-4.152 2.4-4.212-1.32-1.932-3.348-2.148-4.056-2.196-1.848-.144-3.396 1.008-4.26 1.008zm3.12-2.832c.78-.936 1.296-2.244 1.152-3.54-1.116.048-2.46.744-3.264 1.68-.72.828-1.344 2.16-1.176 3.432 1.236.096 2.508-.636 3.288-1.572z" />
    </svg>
  )
}

const categories: ProjectCategory[] = ["all", "android", "ios", "backend", "web", "ml"]

type SortOption = "year" | "platform"

interface LightboxState {
  isOpen: boolean
  images: string[]
  currentIndex: number
  title: string
}

interface ImageLightboxProps {
  images: string[]
  currentIndex: number
  title: string
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  onGoTo: (index: number) => void
}

function ImageLightbox({ images, currentIndex, title, onClose, onNext, onPrev, onGoTo }: ImageLightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Minimum swipe distance
  const minSwipeDistance = 50

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe && images.length > 1) {
      onNext()
    }
    if (isRightSwipe && images.length > 1) {
      onPrev()
    }
  }

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowRight") onNext()
      if (e.key === "ArrowLeft") onPrev()
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = "unset"
    }
  }, [onClose, onNext, onPrev])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Image counter */}
      {images.length > 1 && (
        <div className="absolute top-4 left-4 z-50 px-3 py-1.5 rounded-full bg-white/10 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}

      {/* Navigation arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onPrev()
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onNext()
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </>
      )}

      {/* Image container with swipe support */}
      <div
        className="relative w-full h-full flex items-center justify-center p-4 md:p-12"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="relative w-full h-full max-w-4xl max-h-[80vh]"
          >
            <Image
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, 80vw"
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dots indicator */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation()
                onGoTo(index)
              }}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-200",
                index === currentIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/60"
              )}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Image title */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-50 text-white text-sm text-center max-w-md px-4">
        {title}
      </div>
    </motion.div>
  )
}

interface ImageCarouselProps {
  images: string[]
  title: string
  onImageClick: (index: number) => void
}

function ImageCarousel({ images, title, onImageClick }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  if (images.length === 0) return null

  return (
    <div 
      className="relative aspect-square overflow-hidden rounded-lg bg-muted cursor-pointer group"
      onClick={() => onImageClick(currentIndex)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${title} - Image ${currentIndex + 1}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </motion.div>
      </AnimatePresence>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
        <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-sm font-medium bg-black/50 px-3 py-1.5 rounded-full">
          Click to enlarge
        </span>
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm text-foreground hover:bg-background transition-colors opacity-0 group-hover:opacity-100"
            aria-label="Next image"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots indicator */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(index)
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-background/60 hover:bg-background/80"
                )}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>("all")
  const [sortBy, setSortBy] = useState<SortOption>("year")
  const { language } = useLanguage()
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    images: [],
    currentIndex: 0,
    title: "",
  })

  const openLightbox = useCallback((images: string[], index: number, title: string) => {
    setLightbox({
      isOpen: true,
      images,
      currentIndex: index,
      title,
    })
  }, [])

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, isOpen: false }))
  }, [])

  const nextLightboxImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex + 1) % prev.images.length,
    }))
  }, [])

  const prevLightboxImage = useCallback(() => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: (prev.currentIndex - 1 + prev.images.length) % prev.images.length,
    }))
  }, [])

  const goToLightboxImage = useCallback((index: number) => {
    setLightbox((prev) => ({
      ...prev,
      currentIndex: index,
    }))
  }, [])

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects.filter((project) =>
      activeCategory === "all" ? true : project.category.includes(activeCategory)
    )

    if (sortBy === "year") {
      filtered.sort((a, b) => b.year - a.year)
    } else {
      // Sort by platform count (more platforms first)
      filtered.sort((a, b) => b.platforms.length - a.platforms.length)
    }

    return filtered
  }, [activeCategory, sortBy])

  return (
    <div className="content">
      <article>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {getText(translations.projects.title, language)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getText(translations.projects.description, language)}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {getText(categoryLabels[category], language)}
                </button>
              ))}
            </div>

            {/* Sort Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortBy(sortBy === "year" ? "platform" : "year")}
              className="gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortBy === "year" 
                ? getText(translations.projects.byYear, language)
                : getText(translations.projects.byPlatform, language)}
            </Button>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                >
                  {/* Image Carousel */}
                  <ImageCarousel 
                    images={project.images} 
                    title={project.title}
                    onImageClick={(index) => openLightbox(project.images, index, project.title)}
                  />

                  {/* Content */}
                  <div className="p-5">
                    {/* Title & Year */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                        {project.title}
                      </h3>
                      <span className="text-sm text-muted-foreground shrink-0">
                        {project.year}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {getText(project.description, language)}
                    </p>

                    {/* Platform Icons */}
                    {project.platforms.length > 0 && (
                      <div className="flex items-center gap-2 mb-4">
                        {project.platforms.includes("android") && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Smartphone className="w-4 h-4" />
                            <span>Android</span>
                          </div>
                        )}
                        {project.platforms.includes("ios") && (
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <AppleIcon className="w-4 h-4" />
                            <span>iOS</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Links */}
                    <div className="flex items-center gap-2 flex-wrap">
                      {project.links.playStore && (
                        <a
                          href={project.links.playStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
                          aria-label="View on Play Store"
                        >
                          <PlayStoreIcon className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.appStore && (
                        <a
                          href={project.links.appStore}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
                          aria-label="View on App Store"
                        >
                          <AppStoreIcon className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.github && (
                        <a
                          href={project.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
                          aria-label="View on GitHub"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.links.web && (
                        <a
                          href={project.links.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80 transition-colors"
                          aria-label="Visit website"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredAndSortedProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                {getText(translations.projects.noProjects, language)}
              </p>
            </motion.div>
          )}
        </motion.div>
      </article>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <ImageLightbox
            images={lightbox.images}
            currentIndex={lightbox.currentIndex}
            title={lightbox.title}
            onClose={closeLightbox}
            onNext={nextLightboxImage}
            onPrev={prevLightboxImage}
            onGoTo={goToLightboxImage}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
