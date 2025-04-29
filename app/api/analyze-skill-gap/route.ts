import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

interface LearningPlanItem {
  skill: string
  level: string
  resources: {
    title: string
    url: string
    type: string
  }[]
}

interface MockResources {
  [key: string]: {
    title: string
    url: string
    type: string
  }[]
}

const mockResources: MockResources = {
  "React": [
    {
      title: "React Documentation",
      url: "https://reactjs.org/docs/getting-started.html",
      type: "Documentation"
    },
    {
      title: "React Tutorial",
      url: "https://reactjs.org/tutorial/tutorial.html",
      type: "Tutorial"
    }
  ],
  "TypeScript": [
    {
      title: "TypeScript Documentation",
      url: "https://www.typescriptlang.org/docs/",
      type: "Documentation"
    },
    {
      title: "TypeScript Tutorial",
      url: "https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html",
      type: "Tutorial"
    }
  ]
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock response for development
    const mockLearningPlan: LearningPlanItem[] = [
      {
        skill: "React",
        level: "Intermediate",
        resources: mockResources["React"]
      },
      {
        skill: "TypeScript",
        level: "Beginner",
        resources: mockResources["TypeScript"]
      }
    ]

    return NextResponse.json({ learningPlan: mockLearningPlan })
  } catch (error) {
    console.error("Error analyzing skill gap:", error)
    return NextResponse.json(
      { error: "Failed to analyze skill gap" },
      { status: 500 }
    )
  }
} 