"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

type LearningPlanProps = {
  view: "timeline" | "cards"
}

const learningPlan = [
  {
    day: 1,
    title: "Introduction to Python",
    skill: "Python",
    description: "Learn the basics of Python programming language",
    resource: "Udemy - Python for Beginners",
    url: "#",
  },
  {
    day: 2,
    title: "Python Data Structures",
    skill: "Python",
    description: "Master lists, dictionaries, sets and tuples",
    resource: "Coursera - Python Data Structures",
    url: "#",
  },
  {
    day: 3,
    title: "Introduction to Data Analysis",
    skill: "Data Analysis",
    description: "Understand the fundamentals of data analysis",
    resource: "DataCamp - Introduction to Data Science",
    url: "#",
  },
  {
    day: 4,
    title: "NumPy Fundamentals",
    skill: "Data Analysis",
    description: "Learn to work with NumPy arrays for numerical computing",
    resource: "Udemy - NumPy for Data Science",
    url: "#",
  },
  {
    day: 5,
    title: "Pandas Basics",
    skill: "Data Analysis",
    description: "Learn to manipulate and analyze data with Pandas",
    resource: "Coursera - Data Analysis with Python",
    url: "#",
  },
  {
    day: 6,
    title: "Data Visualization with Matplotlib",
    skill: "Data Analysis",
    description: "Create effective visualizations with Matplotlib",
    resource: "Udemy - Data Visualization with Python",
    url: "#",
  },
  {
    day: 7,
    title: "Weekly Review & Practice",
    skill: "Multiple",
    description: "Review what you've learned and practice with exercises",
    resource: "GitHub - Python Data Science Exercises",
    url: "#",
  },
  {
    day: 8,
    title: "SQL Fundamentals",
    skill: "SQL",
    description: "Learn the basics of SQL for data querying",
    resource: "Khan Academy - Intro to SQL",
    url: "#",
  },
  {
    day: 9,
    title: "Advanced SQL Queries",
    skill: "SQL",
    description: "Master joins, subqueries, and advanced SQL techniques",
    resource: "Udemy - Advanced SQL for Data Analysis",
    url: "#",
  },
  {
    day: 10,
    title: "Introduction to Machine Learning",
    skill: "Machine Learning",
    description: "Understand the basics of machine learning algorithms",
    resource: "Coursera - Machine Learning by Andrew Ng",
    url: "#",
  },
]

export default function LearningPlan({ view }: LearningPlanProps) {
  if (view === "timeline") {
    return (
      <div className="relative">
        <div className="absolute left-9 top-0 bottom-0 w-0.5 bg-gray-200"></div>
        <div className="space-y-8">
          {learningPlan.map((item) => (
            <div key={item.day} className="relative flex items-start">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-teal-400 to-blue-500 text-white font-bold text-xl flex-shrink-0 z-10">
                {item.day}
              </div>
              <div className="ml-6 bg-white rounded-lg border p-4 flex-grow shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.title}</h3>
                    <Badge variant="outline" className="mt-1">
                      {item.skill}
                    </Badge>
                    <p className="mt-2 text-gray-600">{item.description}</p>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    <span>Start</span>
                  </Button>
                </div>
                <div className="mt-3 pt-3 border-t text-sm text-gray-500">Resource: {item.resource}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {learningPlan.map((item) => (
        <Card key={item.day}>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className="bg-gradient-to-r from-teal-400 to-blue-500 hover:from-teal-500 hover:to-blue-600">
                Day {item.day}
              </Badge>
              <Badge variant="outline">{item.skill}</Badge>
            </div>
            <CardTitle className="mt-2">{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-3">Resource: {item.resource}</p>
            <Button variant="outline" size="sm" className="w-full flex items-center justify-center gap-1">
              <ExternalLink className="h-3 w-3" />
              <span>Start Learning</span>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
