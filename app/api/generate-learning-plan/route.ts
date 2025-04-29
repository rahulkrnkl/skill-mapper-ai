import { NextResponse } from 'next/server'
import { z } from 'zod'
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { HuggingFaceModel } from "@/types/huggingface"

// Input validation schema
const requestSchema = z.object({
  currentRole: z.string().min(1),
  targetRole: z.string().min(1),
  knownSkills: z.array(z.string()).min(1),
  model: z.string().optional(),
  maxTokens: z.number().min(100).max(4000).optional(),
  temperature: z.number().min(0).max(1).optional(),
})

interface ModelResponse {
  generated_text: string
}

interface ParsedLearningPlan {
  skill: string
  description: string
  dailyTasks: string[]
}

// Fetch available models from Hugging Face API
async function getAvailableModels() {
  try {
    const response = await fetch(
      'https://api-inference.huggingface.co/models',
      {
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch available models')
    }

    const models: HuggingFaceModel[] = await response.json()
    return models
      .filter((model: HuggingFaceModel) => 
        model.tags?.includes('text-generation') && 
        model.tags?.includes('instruct')
      )
      .map((model: HuggingFaceModel) => model.id)
  } catch (error) {
    console.error('Error fetching models:', error)
    // Fallback to default models if API fails
    return [
      'mistralai/Mixtral-8x7B-Instruct-v0.1',
      'HuggingFaceH4/zephyr-7b-alpha',
      'mistralai/Mistral-7B-Instruct-v0.2'
    ]
  }
}

async function generateLearningPlan(
  currentRole: string,
  targetRole: string,
  knownSkills: string[],
  model: string,
  maxTokens: number = 2000,
  temperature: number = 0.7
) {
  const prompt = `You are a career development AI assistant. Analyze the skill gap between a ${currentRole} and a ${targetRole}.
  
Current Skills: ${knownSkills.join(', ')}

Generate a detailed 30-day learning plan to bridge this gap. Focus on practical, actionable steps.

Format the response as JSON with this exact structure:
{
  "missingSkills": ["skill1", "skill2"],
  "plan": [
    {
      "day": 1,
      "focus": "specific learning focus for the day",
      "suggestedResources": ["resource1", "resource2"]
    }
  ]
}

Make the plan realistic and achievable. Include specific learning objectives and resources for each day.`

  try {
    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: prompt,
          parameters: {
            max_new_tokens: maxTokens,
            temperature: temperature,
            top_p: 0.9,
            return_full_text: false,
          },
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Hugging Face API error: ${response.statusText}`)
    }

    const data: ModelResponse = await response.json()
    
    // Extract the generated text and parse it as JSON
    const generatedText = Array.isArray(data) ? data[0].generated_text : data.generated_text
    
    try {
      const parsedData: ParsedLearningPlan = JSON.parse(generatedText)
      return parsedData
    } catch (parseError) {
      // If JSON parsing fails, try to extract JSON from the text
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      throw new Error('Failed to parse model response as JSON')
    }
  } catch (error) {
    console.error('Error generating learning plan:', error)
    throw error
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { skill } = await req.json()

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