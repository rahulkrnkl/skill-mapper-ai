import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

interface ModelResponse {
  generated_text: string
}

interface ParsedLearningPlan {
  skill: string
  description: string
  dailyTasks: string[]
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock response for development
    const mockLearningPlan: ParsedLearningPlan = {
      skill: "React",
      description: "Learn React fundamentals and best practices",
      dailyTasks: [
        "Day 1: Introduction to React and JSX",
        "Day 2: Components and Props",
        "Day 3: State and Lifecycle",
        "Day 4: Handling Events",
        "Day 5: Conditional Rendering",
        "Day 6: Lists and Keys",
        "Day 7: Forms and Controlled Components",
        "Day 8: Lifting State Up",
        "Day 9: Composition vs Inheritance",
        "Day 10: Thinking in React"
      ]
    }

    return NextResponse.json({ learningPlan: mockLearningPlan })
  } catch (error) {
    console.error("Error generating learning plan:", error)
    return NextResponse.json(
      { error: "Failed to generate learning plan" },
      { status: 500 }
    )
  }
} 