"use client"

import { useState, useRef } from "react"
import { Search, Bell, Menu, PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarContent } from "@/components/sidebar-nav"
import { useIsMobile } from "@/components/ui/use-mobile"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export function DashboardHeader() {
    const isMobile = useIsMobile()
    const router = useRouter()
    const { toast } = useToast()
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
    const [isNewProjectOpen, setIsNewProjectOpen] = useState(false)
    const [projectName, setProjectName] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    const notifications = [
        { id: 1, text: "Blog Post Generated", time: "2m ago" },
        { id: 2, text: "New Voice Clone", time: "15m ago" },
        { id: 3, text: "API Key Rotated", time: "1h ago" },
        { id: 4, text: "Team Member Added", time: "3h ago" },
    ]

    const handleCreateProject = async () => {
        if (!projectName.trim()) return
        setIsCreating(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        toast({
            title: "Project Created",
            description: `"${projectName}" has been successfully created.`,
        })
        setIsCreating(false)
        setIsNewProjectOpen(false)
        setProjectName("")
        router.push("/projects")
    }

    return (
        <header className={`sticky top-0 z-30 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800 ${isMobile ? "px-4" : "px-8"}`}>
            <div className="h-16 flex items-center justify-between gap-4">
                {isMobile && (
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="shrink-0">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SidebarContent onItemClick={() => { }} />
                        </SheetContent>
                    </Sheet>
                )}

                <div className={`flex items-center gap-4 flex-1 ${isMobile ? "min-w-0" : ""}`}>
                    <div className={`relative w-full ${isMobile ? "max-w-full" : "max-w-md"}`}>
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder={isMobile ? "Search..." : "Search projects, tools, or team..."}
                            className="pl-9 h-10 bg-slate-100 dark:bg-slate-800 border-0 rounded-lg focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="relative text-muted-foreground hover:text-primary transition-colors"
                            aria-label="Notifications"
                            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                        >
                            <Bell className="h-5 w-5" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                        </Button>
                        {isNotificationsOpen && (
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
                                    onClick={() => setIsNotificationsOpen(false)}
                                >
                                    View All
                                </button>
                            </div>
                        )}
                    </div>
                    {!isMobile && (
                        <Dialog open={isNewProjectOpen} onOpenChange={setIsNewProjectOpen}>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="gap-2 font-medium bg-gradient-to-r from-[#ED985F] to-[#F7B980] hover:shadow-lg transition-all text-white border-0"
                                >
                                    <PlusCircle className="h-4 w-4" />
                                    New Project
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                                <DialogHeader>
                                    <DialogTitle>Create New Project</DialogTitle>
                                    <DialogDescription>
                                        Give your project a name and start building with Sporitech AI.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid gap-2">
                                        <Label htmlFor="project-name">Project Name</Label>
                                        <Input
                                            id="project-name"
                                            placeholder="e.g. Summer Campaign 2026"
                                            value={projectName}
                                            onChange={(e) => setProjectName(e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsNewProjectOpen(false)}>Cancel</Button>
                                    <Button
                                        onClick={handleCreateProject}
                                        disabled={isCreating || !projectName.trim()}
                                        className="bg-gradient-to-r from-[#ED985F] to-[#F7B980] text-white"
                                    >
                                        {isCreating ? "Creating..." : "Create Project"}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    )}
                </div>
            </div>
        </header>
    )
}
