"use client"

import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Calendar, ArrowUpDown, ExternalLink } from "lucide-react"
import { blogPosts, blogTopics, translations, getText } from "@/lib/data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

// Medium icon
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

// Kompasiana icon (custom)
function KompasianaIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fontSize="10"
        fill="white"
        fontWeight="bold"
      >
        K
      </text>
    </svg>
  )
}

type SortOrder = "newest" | "oldest"

export function BlogSection() {
  const [activeTopic, setActiveTopic] = useState("all")
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest")
  const { language } = useLanguage()

  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) =>
      activeTopic === "all" ? true : post.topic === activeTopic
    )

    filtered.sort((a, b) => {
      const dateA = new Date(a.date).getTime()
      const dateB = new Date(b.date).getTime()
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB
    })

    return filtered
  }, [activeTopic, sortOrder])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(language === "id" ? "id-ID" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="content">
      <article>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {getText(translations.blog.title, language)}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {getText(translations.blog.description, language)}
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
            {/* Topic Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {blogTopics.map((topic) => (
                <button
                  key={topic.value}
                  onClick={() => setActiveTopic(topic.value)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeTopic === topic.value
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-muted-foreground hover:text-foreground"
                  )}
                >
                  {getText(topic.label, language)}
                </button>
              ))}
            </div>

            {/* Sort Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setSortOrder(sortOrder === "newest" ? "oldest" : "newest")
              }
              className="gap-2"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === "newest" 
                ? getText(translations.blog.newest, language)
                : getText(translations.blog.oldest, language)}
            </Button>
          </div>

          {/* Blog Posts List */}
          <motion.div layout className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedPosts.map((post) => (
                <motion.a
                  key={post.id}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="group flex flex-col sm:flex-row items-start gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {/* Thumbnail */}
                  <div className="w-full sm:w-32 h-32 sm:h-24 relative rounded-lg overflow-hidden shrink-0 bg-muted">
                    <Image
                      src={post.thumbnail}
                      alt={getText(post.title, language)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {getText(post.title, language)}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      {/* Platform Badge */}
                      <div className="flex items-center gap-1.5">
                        {post.platform === "medium" ? (
                          <MediumIcon className="w-4 h-4" />
                        ) : (
                          <KompasianaIcon className="w-4 h-4" />
                        )}
                        <span className="capitalize">{post.platform}</span>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                    </div>
                  </div>

                  {/* External Link Icon */}
                  <div className="hidden sm:flex items-center justify-center p-2 text-muted-foreground group-hover:text-primary transition-colors">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Empty State */}
          {filteredAndSortedPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                {getText(translations.blog.noArticles, language)}
              </p>
            </motion.div>
          )}
        </motion.div>
      </article>
    </div>
  )
}
