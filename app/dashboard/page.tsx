"use client"

import { useEffect } from "react"
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/")
    },
  })

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, {session?.user?.name}</h1>
        <p className="text-gray-600">Let&apos;s map your skills and create a learning plan.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Skill Gap Analysis</CardTitle>
            <CardDescription>
              Analyze your current skills against your target role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/skill-gap">
              <Button className="w-full">
                Start Analysis <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Learning Plans</CardTitle>
            <CardDescription>
              View and manage your learning plans
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/learning-plans">
              <Button className="w-full">
                View Plans <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
