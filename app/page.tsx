"use client"

import { DashboardStats } from "@/components/dashboard-stats"
import { UsageChart } from "@/components/usage-chart"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Search, Bell, Zap, ArrowRight, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/sidebar-nav"
import { Input } from "@/components/ui/input"
import { Suspense, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { useIsMobile } from "@/components/ui/use-mobile"

export default function Home() {
  const isMobile = useIsMobile()
  const router = useRouter()
  const quickLaunchTools = [
    { title: "Content Architect", desc: "Long-form SEO generation", icon: "✍️", route: "/tools/content", color: "from-blue-500 to-blue-600" },
    { title: "Code Refactor", desc: "AI-powered optimization", icon: "💻", route: "/tools/code", color: "from-purple-500 to-purple-600" },
    { title: "Voice Lab", desc: "Cloning and synthesis", icon: "🎙️", route: "/tools/voice", color: "from-pink-500 to-pink-600" },
    { title: "Media Forge", desc: "DALL-E 3 visual creation", icon: "🎨", route: "/tools/media", color: "from-orange-500 to-orange-600" },
  ]
  const handleNewProject = () => {
    router.push("/projects")
  }

  function NotificationBell() {
    const [open, setOpen] = useState(false)
    const bellRef = useRef(null)
    const notifications = [
      { id: 1, text: "Blog Post Generated", time: "2m ago" },
      { id: 2, text: "New Voice Clone", time: "15m ago" },
      { id: 3, text: "API Key Rotated", time: "1h ago" },
      { id: 4, text: "Team Member Added", time: "3h ago" },
    ]
    return (
      <>
        <Button
          ref={bellRef}
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-primary transition-colors"
          aria-label="Notifications"
          onClick={() => setOpen((v) => !v)}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </Button>
        {open && (
          <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 z-50 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </div>
            <ul className="max-h-64 overflow-y-auto">
              {notifications.map((n) => (
                <li key={n.id} className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors">
                  <div className="flex justify-between items-start">
                    <span className="font-medium text-sm">{n.text}</span>
                    <span className="text-xs text-muted-foreground">{n.time}</span>
                  </div>
                </li>
              ))}
            </ul>
            <button
              className="w-full py-2 text-xs font-semibold text-primary hover:bg-slate-50 dark:hover:bg-slate-800 border-t border-slate-200 dark:border-slate-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              View All
            </button>
          </div>
        )}
      </>
    )
  }

  return (
    <Suspense fallback={null}>
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        {/* Main Content */}
        <div className={`${isMobile ? "px-4 py-6" : "p-8"} max-w-7xl mx-auto space-y-8`}>
          {/* Welcome Section */}
          <section className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              <h1 className={`font-bold tracking-tight bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent ${isMobile ? "text-2xl" : "text-4xl"}`}>
                Welcome back, Alex!
              </h1>
            </div>
            <p className="text-muted-foreground">Your unified suite for AI-powered content creation, coding, and media enhancement is ready.</p>
          </section>

          {/* Stats Section */}
          <section>
            <DashboardStats />
          </section>

          {/* Charts & Activity */}
          <div className={`grid gap-6 ${isMobile ? "grid-cols-1" : "lg:grid-cols-3"}`}>
            <div className={isMobile ? "" : "lg:col-span-2"}>
              <UsageChart />
            </div>

            <Card className="border-0 bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="border-b border-slate-200 dark:border-slate-800">
                <CardTitle className="flex items-center gap-2">Recent Activity</CardTitle>
                <CardDescription>Latest actions from your workspace</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 pt-6">
                {[
                  { name: "Blog Post Generated", time: "2m ago", type: "Content", color: "bg-blue-100 dark:bg-blue-900" },
                  { name: "New Voice Clone", time: "15m ago", type: "Voice", color: "bg-pink-100 dark:bg-pink-900" },
                  { name: "API Key Rotated", time: "1h ago", type: "Security", color: "bg-red-100 dark:bg-red-900" },
                  { name: "Team Member Added", time: "3h ago", type: "Team", color: "bg-green-100 dark:bg-green-900" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group cursor-pointer"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <div className="flex-1">
                        <span className="font-medium text-sm block">{item.name}</span>
                        <span className="text-xs text-muted-foreground">{item.type}</span>
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground group-hover:text-primary transition-colors">{item.time}</span>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs mt-4 text-primary hover:text-primary/80">
                  View all activity <ArrowRight className="h-3 w-3 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Launch */}
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Quick Launch</h2>
              <p className="text-sm text-muted-foreground mt-1">Access your favorite AI tools instantly</p>
            </div>
            <div className={`grid gap-4 ${isMobile ? "grid-cols-1 sm:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-4"}`}>
              {quickLaunchTools.map((tool) => (
                <Card
                  key={tool.title}
                  className="border-0 cursor-pointer group hover:shadow-2xl transition-all duration-300 transform hover:scale-105 bg-white dark:bg-slate-900 overflow-hidden"
                  onClick={() => router.push(tool.route)}
                  tabIndex={0}
                  role="button"
                  aria-label={`Launch ${tool.title}`}
                  onKeyPress={e => { if (e.key === "Enter") router.push(tool.route) }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  <CardContent className="p-6 relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-4xl">{tool.icon}</span>
                      <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1" />
                    </div>
                    <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{tool.title}</h3>
                    <p className="text-xs text-muted-foreground">{tool.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
    </Suspense>
  )
}
