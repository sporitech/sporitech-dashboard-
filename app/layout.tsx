import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import ClientLayout from "./client-layout"

export const metadata: Metadata = {
  title: "Sporitech AI Dashboard",
  description: "Manage your AI tools, prompts, and analytics in one place.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/favicon.svg",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/favicon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/favicon.svg",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning>
        <div className="flex min-h-screen">
          <ClientLayout>{children}</ClientLayout>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
