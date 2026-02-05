import { AuthForm } from "@/components/auth-form"
import Image from "next/image"

export default function SignupPage() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#001F3D] via-[#0a3d5c] to-[#001F3D] opacity-90" />

      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/ai_productivity_background.png"
          alt="AI Productivity Background"
          fill
          className="object-cover opacity-40"
          priority
        />
      </div>

      {/* Animated Gradient Orbs */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-[#ED985F] to-[#F7B980] rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse z-0" />

      {/* Auth Content */}
      <div className="relative z-10 w-full max-w-md px-4 space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="relative">
            <div className="" />
            <div className="">
              <div className="">
                <Image
                  src="/logo.svg"
                  alt="Sporitech Logo"
                  width={80}
                  height={80}
                  className=""
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ED985F] to-[#F7B980]">SPORITECH</span>
            </h1>
            <p className="text-gray-300 font-medium tracking-wide text-sm max-w-[280px] mx-auto">
              AI-Powered Creative & Productivity Tools Suite
            </p>
          </div>
        </div>

        {/* Auth Form Card */}
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#ED985F]/20 to-[#F7B980]/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-2xl border border-white/20 hover:border-white/40 transition-all duration-300 p-8 shadow-2xl">
            <AuthForm mode="signup" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-2">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Sporitech. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            Secure • Fast • Intelligent
          </p>
        </div>
      </div>
    </div>
  )
}
