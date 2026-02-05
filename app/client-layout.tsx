"use client"

import type React from "react"
import { SidebarNav } from "@/components/sidebar-nav"
import { DashboardHeader } from "@/components/dashboard-header"
import { usePathname, useRouter } from "next/navigation"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"

// Client wrapper to handle navigation logic for sidebar exclusion
function SidebarNavWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  // Check if current page is an auth page (login or signup)
  const isAuthPage = pathname?.startsWith("/login") || pathname?.startsWith("/signup")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user && !isAuthPage) {
        router.push("/login")
      } else if (user && isAuthPage) {
        router.push("/")
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [isAuthPage, router])

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (isAuthPage) return <div className="w-full h-full">{children}</div>

  return (
    <>
      <SidebarNav />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader />
        {children}
      </div>
    </>
  )
}

export default SidebarNavWrapper
