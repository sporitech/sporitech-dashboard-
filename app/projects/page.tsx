"use client"

import { FolderPlus, Search, Filter, MoreHorizontal, Calendar, ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Suspense } from "react"

const projects = [
  {
    id: "PRJ-001",
    name: "Marketing Campaign Q1",
    status: "Active",
    progress: 75,
    lastModified: "2 hours ago",
    type: "Content",
    members: 3,
  },
  {
    id: "PRJ-002",
    name: "E-commerce Redesign",
    status: "Review",
    progress: 90,
    lastModified: "5 hours ago",
    type: "Code",
    members: 5,
  },
  {
    id: "PRJ-003",
    name: "Social Media Assets",
    status: "Draft",
    progress: 30,
    lastModified: "Yesterday",
    type: "Media",
    members: 2,
  },
  {
    id: "PRJ-004",
    name: "Customer Voice Assistant",
    status: "Active",
    progress: 45,
    lastModified: "2 days ago",
    type: "Voice",
    members: 4,
  },
]

function ProjectsContent() {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search projects..." className="pl-9" />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Dates
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Manage your ongoing workspace initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-sm">{project.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{project.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] font-bold border-none",
                        project.status === "Active"
                          ? "bg-blue-100 text-blue-700"
                          : project.status === "Review"
                            ? "bg-purple-100 text-purple-700"
                            : "bg-gray-100 text-gray-700",
                      )}
                    >
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="min-w-[150px]">
                    <div className="flex items-center gap-3">
                      <Progress value={project.progress} className="h-1.5" />
                      <span className="text-xs font-mono">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {project.lastModified}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open Project</DropdownMenuItem>
                        <DropdownMenuItem>Edit Details</DropdownMenuItem>
                        <DropdownMenuItem>Share with Team</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Archive Project</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Project Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { label: "Content Marketing", count: 12, color: "bg-blue-500" },
              { label: "Software Dev", count: 8, color: "bg-coral" },
              { label: "Voice Training", count: 5, color: "bg-purple-500" },
              { label: "Asset Creation", count: 15, color: "bg-green-500" },
            ].map((item) => (
              <div key={item.label} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span>{item.label}</span>
                  <span className="font-bold">{item.count} projects</span>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className={cn("h-full", item.color)} style={{ width: `${(item.count / 40) * 100}%` }} />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-lg">Project Quick Links</CardTitle>
            <CardDescription>Jump back into your most recent work</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              "Update hero copy for Landing Page",
              "Refactor authentication middleware",
              "Synthesize voiceover for Promo video",
            ].map((link, i) => (
              <button
                key={i}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-background border hover:border-primary/50 transition-colors group text-sm text-left"
              >
                <span className="truncate">{link}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
              </button>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default function ProjectsPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Manager</h1>
          <p className="text-muted-foreground">Track and manage your AI-driven projects and history</p>
        </div>
      </div>

      <Suspense fallback={null}>
        <ProjectsContent />
      </Suspense>
    </div>
  )
}
