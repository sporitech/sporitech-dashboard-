"use client"

import { PromptCard } from "@/components/prompt-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter, Plus } from "lucide-react"
import { Suspense } from "react"

const prompts = [
  {
    title: "SEO Blog Post Architect",
    description: "Structure a high-ranking SEO blog post with optimal header placement and keyword density.",
    category: "Content",
    isPremium: true,
    usageCount: 1240,
  },
  {
    title: "React Component Optimizer",
    description: "Refactor existing React components for better performance using memo and useCallback.",
    category: "Code",
    isPremium: false,
    usageCount: 856,
  },
  {
    title: "Cinematic Image Director",
    description: "Detailed prompt parameters for generating high-fidelity cinematic landscapes.",
    category: "Media",
    isPremium: true,
    usageCount: 2300,
  },
  {
    title: "Email Outreach Specialist",
    description: "Cold email templates that focus on high conversion rates for B2B services.",
    category: "Marketing",
    isPremium: false,
    usageCount: 567,
  },
  {
    title: "Technical Documentation Writer",
    description: "Convert complex code logic into clear, human-readable API documentation.",
    category: "Content",
    isPremium: false,
    usageCount: 342,
  },
  {
    title: "Abstract Logo Conceptor",
    description: "Prompts for generating minimalist, modern logo concepts for tech startups.",
    category: "Media",
    isPremium: true,
    usageCount: 1120,
  },
]

export default function PromptsPage() {
  return (
    <>
      <Suspense fallback={null}>
        <main className="flex-1 overflow-y-auto p-8">
          <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Premium Prompt Library</h1>
              <p className="text-muted-foreground">Access and manage high-performance AI prompt templates.</p>
            </div>
          </header>

          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search prompts..." className="pl-9" />
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Filter className="h-4 w-4" />
              Filters
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {prompts.map((prompt) => (
              <PromptCard key={prompt.title} {...prompt} />
            ))}
          </div>
        </main>
      </Suspense>
    </>
  )
}
