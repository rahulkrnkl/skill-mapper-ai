"use client"

import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import DashboardContent from "@/components/dashboard-content"

export default function DashboardPage() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/")
    },
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return <DashboardContent />
}
