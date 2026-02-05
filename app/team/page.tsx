"use client"

import { cn } from "@/lib/utils"
import { UserPlus, Mail, Shield, MoreVertical, Search, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const teamMembers = [
  {
    name: "Alex Johnson",
    email: "alex@sporitech.com",
    role: "Founder & Lead Architect",
    status: "Active",
    avatar: "/diverse-group-meeting.png",
  },
  {
    name: "Sarah Chen",
    email: "sarah@sporitech.com",
    role: "Head of AI Research",
    status: "Active",
    avatar: "/diverse-group-smiling.png",
  },
  {
    name: "Marcus Thorne",
    email: "marcus@sporitech.com",
    role: "Senior Content Strategist",
    status: "Active",
    avatar: "/marcus.jpg",
  },
  {
    name: "Elena Rodriguez",
    email: "elena@sporitech.com",
    role: "Product Designer",
    status: "Invited",
    avatar: "/portrait-elena.png",
  },
]

export default function TeamPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Collaboration</h1>
          <p className="text-muted-foreground">Manage your team members and their access levels</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4 / 10</div>
            <p className="text-[10px] text-muted-foreground">6 slots remaining in Pro plan</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Pending Invites</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-500">1</div>
            <p className="text-[10px] text-muted-foreground">Expires in 48 hours</p>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Workspace Activity</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {teamMembers.map((m) => (
                <Avatar key={m.email} className="border-2 border-background ring-0">
                  <AvatarImage src={m.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{m.name[0]}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-bold text-foreground">Sarah</span> and{" "}
              <span className="font-bold text-foreground">Marcus</span> are currently online
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Members</CardTitle>
              <CardDescription>A list of all team members and their roles</CardDescription>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search members..." className="pl-9 h-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.email}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={member.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{member.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium text-sm leading-none">{member.name}</span>
                        <span className="text-xs text-muted-foreground">{member.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Shield className="w-3 h-3 text-muted-foreground" />
                      <span className="text-sm">{member.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={cn(
                        "text-[10px] font-bold border-none",
                        member.status === "Active" ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700",
                      )}
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Permissions</DropdownMenuItem>
                        <DropdownMenuItem>Change Role</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Remove Member</DropdownMenuItem>
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
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { user: "Sarah Chen", action: "generated a new logo", time: "2 hours ago" },
              { user: "Marcus Thorne", action: "published a code snippet", time: "5 hours ago" },
              { user: "Alex Johnson", action: "updated the prompt library", time: "Yesterday" },
            ].map((activity, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  <span className="font-bold">{activity.user}</span> {activity.action}
                  <span className="text-muted-foreground block text-[10px]">{activity.time}</span>
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <CardTitle className="text-lg">Invite Settings</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Anyone with an <span className="font-bold text-foreground">@sporitech.com</span> email address can join
              this workspace.
            </p>
            <Button
              variant="outline"
              className="w-full bg-transparent border-primary/20 text-primary hover:bg-primary/5"
            >
              Change Domain Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
