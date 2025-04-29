"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { useToast } from '@/components/ui/use-toast'
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useEffect } from "react"

export default function HomePage() {
  const { toast } = useToast()
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === "authenticated") {
      redirect("/dashboard")
    }
  }, [status])

  const handleGoogleSignIn = async () => {
    try {
      await signIn('google', { callbackUrl: '/dashboard' })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to sign in with Google",
        variant: "destructive",
      })
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"></div>
          <span className="font-bold text-xl">SkillMapper AI</span>
        </div>
        <nav className="hidden md:flex space-x-6">
          <a href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </a>
          <a href="#how-it-works" className="text-gray-600 hover:text-gray-900">
            How it Works
          </a>
          <a href="#pricing" className="text-gray-600 hover:text-gray-900">
            Pricing
          </a>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Map Your Skills. Master Your Next Role.
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Identify your career gaps and get a 30-day learning plan with AI.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button 
                  onClick={handleGoogleSignIn}
                  className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white px-8 py-6 h-auto text-lg w-full sm:w-auto"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                  Sign in with Google
                </Button>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative w-full h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=500"
                  alt="Skill mapping illustration"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16" id="how-it-works">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">How SkillMapper AI Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-teal-600 font-bold text-xl">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Connect Your Profile</h3>
                <p className="text-gray-600">
                  Sign in with Google or LinkedIn to import your current skills and experience.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Identify Your Target</h3>
                <p className="text-gray-600">
                  Select the role you want to pursue and let our AI analyze the skill gap.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-purple-600 font-bold text-xl">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Your Learning Plan</h3>
                <p className="text-gray-600">Receive a personalized 30-day learning plan with curated resources.</p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white px-8 py-6 h-auto text-lg">
                  Try It Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16" id="features">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">AI-Powered Skill Analysis</h3>
                <p className="text-gray-600">
                  Our advanced AI analyzes your current skills and compares them to industry requirements for your
                  target role.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Personalized Learning Plans</h3>
                <p className="text-gray-600">
                  Get a customized 30-day learning plan with daily tasks and resources tailored to your specific needs.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Visual Skill Gap Analysis</h3>
                <p className="text-gray-600">
                  See your skill gaps visualized in interactive charts to understand where to focus your efforts.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md">
                <h3 className="text-xl font-bold mb-2">Curated Learning Resources</h3>
                <p className="text-gray-600">
                  Access hand-picked courses, tutorials, and resources from top platforms to build your skills
                  efficiently.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-16" id="pricing">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Simple Pricing</h2>
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-teal-500 font-semibold">Premium Plan</div>
                <div className="mt-2">
                  <span className="text-4xl font-bold">$9.99</span>
                  <span className="text-gray-500">/month</span>
                </div>
                <ul className="mt-6 space-y-4">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Unlimited skill gap analyses
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Personalized learning plans
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Progress tracking
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Premium learning resources
                  </li>
                </ul>
                <div className="mt-8">
                  <Link href="/dashboard">
                    <Button className="w-full bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600 text-white">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-400 to-blue-500"></div>
              <span className="font-bold">SkillMapper AI</span>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Privacy
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Terms
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900">
                Contact
              </a>
            </div>
            <div className="mt-4 md:mt-0 text-gray-500 text-sm">© 2025 SkillMapper AI. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
} 