"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  Code2,
  Mic2,
  ImageIcon,
  Library,
  Settings,
  User,
  LogOut,
  CreditCard,
  Users,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Content Tool", href: "/tools/content", icon: FileText },
  { name: "Voice Tool", href: "/tools/voice", icon: Mic2 },
  { name: "Media Tool", href: "/tools/media", icon: ImageIcon },
  { name: "Prompt Library", href: "/prompts", icon: Library },
]

const bottomItems = [
  { name: "Profile", href: "/profile", icon: User },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
]

const NavLink = ({ item, isActive, onClick }: { item: any, isActive: boolean, onClick?: () => void }) => {
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200",
        isActive
          ? "bg-[#ED985F]/10 text-[#ED985F] font-semibold shadow-sm"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <item.icon className={cn("w-5 h-5", isActive ? "text-[#ED985F]" : "")} />
      {item.name}
    </Link>
  )
}

export function SidebarContent({ className, onItemClick }: { className?: string, onItemClick?: () => void }) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push("/login")
      if (onItemClick) onItemClick()
    } catch (error) {
      console.error("[v0] Sign out error:", error)
    }
  }

  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      <div className="h-14 flex items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg text-foreground" onClick={onItemClick}>
          <div className="">
            <Image
              src="/logo.svg"
              alt="Logo"
              width={118}
              height={118}
              className=""
            />
          </div>

        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        <div>
          <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Core</h3>
          <nav className="space-y-0.5">
            {navItems.slice(0, 2).map((item) => (
              <NavLink key={item.name} item={item} isActive={pathname === item.href} onClick={onItemClick} />
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2">
            AI Workspace
          </h3>
          <nav className="space-y-0.5">
            {navItems.slice(2, 6).map((item) => (
              <NavLink key={item.name} item={item} isActive={pathname === item.href} onClick={onItemClick} />
            ))}
          </nav>
        </div>

        <div>
          <h3 className="px-3 text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-2"></h3>
          <nav className="space-y-0.5">
            {navItems.slice(6).map((item) => (
              <NavLink key={item.name} item={item} isActive={pathname === item.href} onClick={onItemClick} />
            ))}
          </nav>
        </div>
      </div>

      <div className="p-4 border-t space-y-1">
        {bottomItems.map((item) => {
          const isActive = pathname === item.href
          return <NavLink key={item.name} item={item} isActive={isActive} onClick={onItemClick} />
        })}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors text-left mt-2"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </div>
  )
}

export function SidebarNav() {
  return (
    <aside className="hidden md:flex w-64 border-r bg-background flex-col h-screen sticky top-0 z-40">
      <SidebarContent />
    </aside>
  )
}
