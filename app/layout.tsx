import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Providers } from "./providers"

// Initialize Inter font with fallback
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
})

export const metadata: Metadata = {
  title: "Skill Mapper AI",
  description: "Map your skills and create personalized learning plans",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Ensure font is loaded before rendering
  const fontClass = inter?.className || "font-sans"
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fontClass} min-h-screen bg-background antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
