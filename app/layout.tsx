import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/app/context/auth"
import { Toaster } from "@/components/ui/toaster"

// Initialize Inter font with fallback
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "SkillMapper AI - Map Your Skills. Master Your Next Role.",
  description: "Identify your career gaps and get a 30-day learning plan with AI.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Ensure font is loaded before rendering
  const fontClass = inter?.className || "font-sans"
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClass} min-h-screen bg-background antialiased`}>
        <AuthProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {children}
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
