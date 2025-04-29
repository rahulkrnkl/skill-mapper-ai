"use client"

import { useState } from "react"
import Link from "next/link"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, BookOpen } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import DashboardHeader from "@/components/dashboard-header"
import SkillRadarChart from "@/components/skill-radar-chart"
import LearningPlan from "@/components/learning-plan"
import SkillGapReport from "@/components/skill-gap-report"

const roles = ["Software Engineer", "Data Scientist", "Product Manager", "UX Designer", "DevOps Engineer"]

const skills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "SQL",
  "AWS",
  "Docker",
  "Kubernetes",
  "Machine Learning",
  "Data Analysis",
  "UI/UX Design",
  "Product Management",
  "Agile",
  "Communication",
]

export default function DashboardContent() {
  const [currentRole, setCurrentRole] = useState("")
  const [targetRole, setTargetRole] = useState("")
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [availableSkills, setAvailableSkills] = useState(skills)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const { toast } = useToast()

  const handleAddSkill = (skill: string) => {
    setSelectedSkills([...selectedSkills, skill])
    setAvailableSkills(availableSkills.filter((s) => s !== skill))
  }

  const handleRemoveSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill))
    setAvailableSkills([...availableSkills, skill])
  }

  const handleAnalyze = () => {
    if (!currentRole || !targetRole || selectedSkills.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields before analyzing",
        variant: "destructive",
      })
      return
    }

    setIsAnalyzing(true)

    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false)
      setShowResults(true)
      toast({
        title: "Analysis complete!",
        description: "Your skill gap analysis and learning plan are ready.",
      })
    }, 2000)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <div className="flex flex-1">
        <aside className="hidden md:block w-64 bg-white border-r p-4">
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-2 bg-gray-100 text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span>Dashboard</span>
            </Link>
            <Link
              href="/learning-plans"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
            >
              <BookOpen className="w-5 h-5" />
              <span>My Learning Plans</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>Settings</span>
            </Link>
            <Link
              href="/"
              className="flex items-center space-x-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 px-4 py-2 rounded-md"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Logout</span>
            </Link>
          </nav>
        </aside>

        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-2xl font-bold mb-6">Skill Gap Analysis</h1>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Input Your Information</CardTitle>
                <CardDescription>Tell us about your current role and where you want to go</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Current Role</label>
                      <Select value={currentRole} onValueChange={setCurrentRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your current role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Target Role</label>
                      <Select value={targetRole} onValueChange={setTargetRole}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your target role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role} value={role}>
                              {role}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Your Skills</label>
                    <div className="border rounded-md p-3 min-h-[120px]">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedSkills.map((skill) => (
                          <Badge key={skill} variant="secondary" className="pl-2 pr-1 py-1">
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                        {selectedSkills.length === 0 && (
                          <span className="text-gray-400 text-sm">No skills selected</span>
                        )}
                      </div>

                      <div className="mt-2">
                        <Select onValueChange={handleAddSkill}>
                          <SelectTrigger>
                            <SelectValue placeholder="Add a skill" />
                          </SelectTrigger>
                          <SelectContent>
                            {availableSkills.map((skill) => (
                              <SelectItem key={skill} value={skill}>
                                {skill}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 text-right">
                  <Button
                    onClick={handleAnalyze}
                    disabled={isAnalyzing}
                    className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600"
                  >
                    {isAnalyzing ? "Analyzing..." : "Analyze Skill Gap"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {showResults && (
              <>
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Gap Analysis</CardTitle>
                      <CardDescription>
                        Comparison between your current skills and required skills for {targetRole}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <SkillRadarChart />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Key Insights</CardTitle>
                      <CardDescription>
                        What you need to focus on to transition from {currentRole} to {targetRole}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span>You have strong foundations in JavaScript and React</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mr-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </span>
                          <span>You need to improve your Python and Machine Learning skills</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-red-100 text-red-600 rounded-full flex items-center justify-center mr-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </span>
                          <span>Critical gap in Data Analysis and Statistical methods</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-2">
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </span>
                          <span>Consider strengthening your SQL and database knowledge</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Detailed Skill Gap Report</CardTitle>
                    <CardDescription>Comprehensive analysis of your skills compared to requirements</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SkillGapReport />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Your 30-Day Learning Plan</CardTitle>
                    <CardDescription>Personalized curriculum to help you bridge the skill gap</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="timeline">
                      <TabsList className="mb-4">
                        <TabsTrigger value="timeline">Timeline View</TabsTrigger>
                        <TabsTrigger value="cards">Card View</TabsTrigger>
                      </TabsList>

                      <TabsContent value="timeline">
                        <LearningPlan view="timeline" />
                      </TabsContent>

                      <TabsContent value="cards">
                        <LearningPlan view="cards" />
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
      <Toaster />
    </div>
  )
}
