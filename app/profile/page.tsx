
"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { auth } from "@/lib/firebase"
import { onAuthStateChanged, updateProfile } from "firebase/auth"
import { Mail, Calendar, Shield, Settings, LogOut, Edit2, Zap, Database, Check, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { updatePassword, sendPasswordResetEmail } from "firebase/auth"


export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [newName, setNewName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser)
      setNewName(firebaseUser?.displayName || "")
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleUpdateProfile = async () => {
    if (!user) return
    setIsUpdating(true)
    try {
      await updateProfile(user, { displayName: newName })
      toast({
        title: "Profile Updated",
        description: "Your display name has been successfully updated.",
      })
      setIsEditing(false)
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Update Error",
        description: error.message,
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleChangePassword = async () => {
    if (!user?.email) return
    try {
      await sendPasswordResetEmail(auth, user.email)
      toast({
        title: "Reset Email Sent",
        description: "A password reset email has been sent to your inbox.",
      })
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      })
    }
  }

  if (loading) {
    return (
      <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 p-8">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 bg-clip-text text-transparent">
          Profile
        </h1>
        <p className="text-muted-foreground text-lg">View and manage your personal Sporitech account.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <Card className="lg:col-span-1 border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/0" />
          <CardContent className="pt-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ED985F] to-[#F7B980] rounded-full blur-lg opacity-30" />
                <Avatar className="w-28 h-28 border-4 border-white dark:border-slate-900 relative z-10">
                  <AvatarImage src={user?.photoURL || "/diverse-user-avatars.png"} />
                  <AvatarFallback className="bg-gradient-to-br from-[#ED985F] to-[#F7B980] text-white text-xl font-bold">
                    {user?.displayName ? user.displayName[0].toUpperCase() : "U"}
                  </AvatarFallback>
                </Avatar>
              </div>

              <div className="space-y-1">
                <h2 className="text-2xl font-bold">{user?.displayName || user?.email || "Unknown User"}</h2>
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  {user?.email}
                </div>
              </div>

              <Badge className="bg-gradient-to-r from-[#ED985F] to-[#F7B980] text-white border-0 text-sm px-4 py-1">
                Pro Member
              </Badge>

              <div className="w-full space-y-2 pt-4 border-t border-slate-200 dark:border-slate-800">
                <Button
                  className="w-full gap-2 bg-gradient-to-r from-[#ED985F] to-[#F7B980] hover:shadow-lg text-white font-semibold"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit2 className="h-4 w-4" />
                  Edit Profile
                </Button>
                <Button
                  variant="outline"
                  className="w-full gap-2 border-slate-200 dark:border-slate-700"
                  onClick={() => {
                    auth.signOut()
                    router.push("/login")
                  }}
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Usage & Stats */}
        <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <CardTitle className="text-2xl">Usage Overview</CardTitle>
            <CardDescription>Your plan allocation and current usage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Tokens Used */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg text-white">
                    <Zap className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Tokens Used</span>
                    <span className="text-xs text-muted-foreground">API calls & generations</span>
                  </div>
                </div>
                <span className="font-bold text-lg">42,500 / 100,000</span>
              </div>
              <div className="relative">
                <Progress value={42.5} className="h-3 bg-slate-200 dark:bg-slate-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-400 h-3 rounded-full" style={{ width: '42.5%' }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>42.5% used</span>
                <span>57,500 remaining</span>
              </div>
            </div>

            {/* Storage Used */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg text-white">
                    <Database className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="font-semibold block">Storage Used</span>
                    <span className="text-xs text-muted-foreground">Generated files & data</span>
                  </div>
                </div>
                <span className="font-bold text-lg">1.2 GB / 5 GB</span>
              </div>
              <div className="relative">
                <Progress value={24} className="h-3 bg-slate-200 dark:bg-slate-800" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-400 h-3 rounded-full" style={{ width: '24%' }} />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>24% used</span>
                <span>3.8 GB available</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Info */}
        <Card className="lg:col-span-2 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <CardTitle className="text-2xl">Account Information</CardTitle>
            <CardDescription>Important dates and account details</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-semibold">Member Since</span>
                </div>
                <p className="text-lg font-bold">
                  {user?.metadata?.creationTime
                    ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })
                    : "Unknown"}
                </p>
              </div>
              <div className="space-y-2 p-4 rounded-lg bg-slate-50 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm font-semibold">Account Status</span>
                </div>
                <p className="text-lg font-bold text-green-600 dark:text-green-400">Active</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security & Settings */}
        <Card className="lg:col-span-1 border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="border-b border-slate-200 dark:border-slate-800">
            <CardTitle className="text-xl">Security</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-slate-200 dark:border-slate-700 h-11"
              onClick={handleChangePassword}
            >
              <Settings className="h-4 w-4" />
              Change Password
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2 border-slate-200 dark:border-slate-700 h-11"
              disabled
            >
              <Shield className="h-4 w-4" />
              Two-Factor Auth
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Edit Profile Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px] bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Update your personal information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Display Name</Label>
              <Input
                id="name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                value={user?.email || ""}
                disabled
                className="bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 opacity-50 cursor-not-allowed"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button
              onClick={handleUpdateProfile}
              disabled={isUpdating}
              className="bg-gradient-to-r from-[#ED985F] to-[#F7B980] text-white"
            >
              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
