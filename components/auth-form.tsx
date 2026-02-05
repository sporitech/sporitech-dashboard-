"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth"
import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { Eye, EyeOff, Lock, Mail, User as UserIcon, ShieldCheck, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export function AuthForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)
  const [passwordStrength, setPasswordStrength] = React.useState(0)

  async function onLogin(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      email: { value: string }
      password: { value: string }
    }

    try {
      await signInWithEmailAndPassword(auth, target.email.value, target.password.value)
      toast({
        title: "Success!",
        description: "Successfully logged in. Redirecting...",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Login Error:", error)
      let errorMessage = "An error occurred during sign-in."

      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "⚠️ FIREBASE SETUP REQUIRED: Email/Password authentication is not enabled in Firebase Console. Please enable it at: https://console.firebase.google.com/project/sporitech/authentication/providers"
      } else if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') {
        errorMessage = "Invalid email or password. Please try again."
      } else if (error.code === 'auth/user-not-found') {
        errorMessage = "No account found with this email. Please sign up first."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address format."
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = "This account has been disabled."
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = "Too many failed attempts. Please try again later."
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        variant: "destructive",
        title: "Login Failed",
        description: errorMessage,
        duration: 10000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function onSignup(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    const target = event.target as typeof event.target & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
      confirmPassword: { value: string }
    }

    // Password validation
    const password = target.password.value
    if (password.length < 8) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must be at least 8 characters long.",
      })
      setIsLoading(false)
      return
    }
    if (!/[A-Z]/.test(password)) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must contain at least one uppercase letter.",
      })
      setIsLoading(false)
      return
    }
    if (!/[0-9]/.test(password)) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must contain at least one number.",
      })
      setIsLoading(false)
      return
    }
    if (!/[!@#$%^&*]/.test(password)) {
      toast({
        variant: "destructive",
        title: "Weak Password",
        description: "Password must contain at least one special character (!@#$%^&*).",
      })
      setIsLoading(false)
      return
    }
    if (password !== target.confirmPassword.value) {
      toast({
        variant: "destructive",
        title: "Password Mismatch",
        description: "Passwords do not match.",
      })
      setIsLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, target.email.value, target.password.value)
      await updateProfile(userCredential.user, { displayName: target.name.value })
      toast({
        title: "Account Created!",
        description: "Successfully registered. Redirecting to dashboard...",
      })
      router.push("/")
    } catch (error: any) {
      console.error("Signup Error:", error)
      let errorMessage = "An error occurred during registration."

      if (error.code === 'auth/operation-not-allowed') {
        errorMessage = "⚠️ FIREBASE SETUP REQUIRED: Email/Password authentication is not enabled in Firebase Console. Please enable it at: https://console.firebase.google.com/project/sporitech/authentication/providers"
      } else if (error.code === 'auth/email-already-in-use') {
        errorMessage = "This email is already registered. Please login instead."
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = "Invalid email address format."
      } else if (error.code === 'auth/weak-password') {
        errorMessage = "Password is too weak. Please use a stronger password."
      } else if (error.message) {
        errorMessage = error.message
      }

      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: errorMessage,
        duration: 10000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const validatePassword = (pass: string) => {
    let strength = 0
    if (pass.length >= 8) strength++
    if (/[A-Z]/.test(pass)) strength++
    if (/[0-9]/.test(pass)) strength++
    if (/[!@#$%^&*]/.test(pass)) strength++
    setPasswordStrength(strength)
    return strength === 4
  }

  async function onGoogleLogin() {
    setIsLoading(true)
    const provider = new GoogleAuthProvider()
    // Add custom parameters to force account selection
    provider.setCustomParameters({ prompt: 'select_account' })

    try {
      const result = await signInWithPopup(auth, provider)
      if (result.user) {
        toast({
          title: "Success",
          description: "Successfully signed in with Google.",
        })
        router.push("/")
      }
    } catch (error: any) {
      console.error("Google Sign-in Error:", error)
      let errorMessage = "An error occurred during Google sign-in."

      if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed before completion."
      } else if (error.code === 'auth/cancelled-by-user') {
        errorMessage = "Sign-in was cancelled."
      } else if (error.code === 'auth/popup-blocked') {
        errorMessage = "Sign-in popup was blocked by your browser."
      }

      toast({
        variant: "destructive",
        title: "Google Authentication Error",
        description: errorMessage,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Tabs defaultValue="login" className="w-full">
      <TabsList className="grid w-full grid-cols-2 bg-white/5 backdrop-blur p-1 mb-6 border border-white/10 rounded-xl">
        <TabsTrigger
          value="login"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ED985F] data-[state=active]:to-[#F7B980] data-[state=active]:text-white data-[state=inactive]:text-white/60 font-semibold py-2.5 rounded-lg transition-all duration-300"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#ED985F] data-[state=active]:to-[#F7B980] data-[state=active]:text-white data-[state=inactive]:text-white/60 font-semibold py-2.5 rounded-lg transition-all duration-300"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="mt-0 space-y-4">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-4 space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Welcome Back</CardTitle>
            <CardDescription className="text-gray-400">Enter your credentials to access the dashboard.</CardDescription>
          </CardHeader>
          <form onSubmit={onLogin}>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300 font-semibold text-sm">
                  Email Address
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@sporitech.com"
                  required
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300 font-semibold text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-white/5 border border-white/10 text-white h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all placeholder:text-white/40 pr-10"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#ED985F] border-white/20 bg-white/5" />
                  <span className="text-gray-400 group-hover:text-gray-200 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-[#ED985F] hover:text-[#F7B980] transition-colors font-medium">Forgot password?</a>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-0 pt-2">
              <Button
                className="w-full bg-gradient-to-r from-[#ED985F] to-[#F7B980] hover:shadow-xl hover:shadow-[#ED985F]/50 text-white font-bold h-12 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Start Sprint"}
              </Button>

              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gradient-to-b from-[#0a3d5c] to-[#001F3D] px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={onGoogleLogin}
                className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-12 rounded-lg transition-all font-medium"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
      <TabsContent value="signup" className="mt-0 space-y-4">
        <Card className="bg-transparent border-0 shadow-none">
          <CardHeader className="pb-4 space-y-1">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">Join the Team</CardTitle>
            <CardDescription className="text-gray-400">Start your journey with Sporitech AI today.</CardDescription>
          </CardHeader>
          <form onSubmit={onSignup}>
            <CardContent className="space-y-4 pt-0">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300 font-semibold text-sm">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Alex Johnson"
                  required
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email" className="text-gray-300 font-semibold text-sm">
                  Email Address
                </Label>
                <Input
                  id="new-email"
                  name="email"
                  type="email"
                  placeholder="name@sporitech.com"
                  required
                  className="bg-white/5 border border-white/10 text-white placeholder:text-white/40 h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-300 font-semibold text-sm">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    onChange={(e) => validatePassword(e.target.value)}
                    className="bg-white/5 border border-white/10 text-white h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all placeholder:text-white/40 pr-10"
                    placeholder="Create a strong password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={cn(
                        "h-1 rounded-full transition-all duration-500",
                        passwordStrength >= i
                          ? (passwordStrength <= 2 ? "bg-red-500" : passwordStrength === 3 ? "bg-yellow-500" : "bg-green-500")
                          : "bg-white/10"
                      )}
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                  <div className={cn("flex items-center gap-1 text-[10px]", passwordStrength >= 1 ? "text-green-400" : "text-gray-500")}>
                    <ShieldCheck className="h-3 w-3" /> 8+ chars
                  </div>
                  <div className={cn("flex items-center gap-1 text-[10px]", /[A-Z]/.test(passwordStrength >= 2 ? "A" : "") ? "text-green-400" : "text-gray-500")}>
                    <ShieldCheck className="h-3 w-3" /> Uppercase
                  </div>
                  <div className={cn("flex items-center gap-1 text-[10px]", /[0-9]/.test(passwordStrength >= 3 ? "1" : "") ? "text-green-400" : "text-gray-500")}>
                    <ShieldCheck className="h-3 w-3" /> Number
                  </div>
                  <div className={cn("flex items-center gap-1 text-[10px]", /[!@#$%^&*]/.test(passwordStrength >= 4 ? "!" : "") ? "text-green-400" : "text-gray-500")}>
                    <ShieldCheck className="h-3 w-3" /> Special
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-300 font-semibold text-sm">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required
                    className="bg-white/5 border border-white/10 text-white h-11 rounded-lg focus-visible:ring-[#ED985F] focus-visible:border-[#ED985F] focus-visible:ring-2 transition-all placeholder:text-white/40 pr-10"
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 pb-0 pt-2">
              <Button
                className="w-full bg-gradient-to-r from-[#ED985F] to-[#F7B980] hover:shadow-xl hover:shadow-[#ED985F]/50 text-white font-bold h-12 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Onboarding..." : "Join Now"}
              </Button>

              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gradient-to-b from-[#0a3d5c] to-[#001F3D] px-2 text-gray-400">Or join with</span>
                </div>
              </div>

              <Button
                variant="outline"
                type="button"
                disabled={isLoading}
                onClick={onGoogleLogin}
                className="w-full bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 h-12 rounded-lg transition-all font-medium"
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
            </CardFooter>
          </form>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
