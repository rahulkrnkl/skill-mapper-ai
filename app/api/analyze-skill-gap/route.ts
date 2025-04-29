import { NextResponse } from 'next/server'
import { z } from 'zod'
import { HfInference } from '@huggingface/inference'

// Input validation schema
const requestSchema = z.object({
  currentRole: z.string().min(1),
  targetRole: z.string().min(1),
  knownSkills: z.array(z.string()).min(1),
})

// Initialize Hugging Face client
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// Mock resources for demonstration
const mockResources = {
  udemy: [
    'https://www.udemy.com/course/mock-course-1',
    'https://www.udemy.com/course/mock-course-2',
    'https://www.udemy.com/course/mock-course-3',
  ],
  coursera: [
    'https://www.coursera.org/learn/mock-course-1',
    'https://www.coursera.org/learn/mock-course-2',
    'https://www.coursera.org/learn/mock-course-3',
  ],
  github: [
    'https://github.com/mock/repo-1',
    'https://github.com/mock/repo-2',
    'https://github.com/mock/repo-3',
  ],
  youtube: [
    'https://youtube.com/watch?v=mock-video-1',
    'https://youtube.com/watch?v=mock-video-2',
    'https://youtube.com/watch?v=mock-video-3',
  ],
}

interface HuggingFaceResponse {
  generated_text: string;
  details?: {
    finish_reason: string;
    generated_tokens: number;
    seed: number;
  };
}

async function analyzeSkills(currentRole: string, targetRole: string, knownSkills: string[]) {
  const prompt = `Analyze the skill gap between a ${currentRole} and a ${targetRole}. 
  Current skills: ${knownSkills.join(', ')}.
  Generate a list of missing skills and a 30-day learning plan for each skill.
  Format the response as JSON with this structure:
  {
    "missingSkills": ["skill1", "skill2"],
    "learningPlan": [
      {
        "skill": "skill1",
        "description": "brief description of the skill",
        "dailyTasks": [
          "Day 1: Task description",
          "Day 2: Task description",
          // ... up to Day 30
        ]
      }
    ]
  }`

  try {
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9,
      },
    })

    // Parse the response
    const result = JSON.parse(response.generated_text)
    return result
  } catch (error) {
    console.error('Error in skill analysis:', error)
    throw new Error('Failed to analyze skills')
  }
}

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    // Analyze skills using Hugging Face
    const analysis = await analyzeSkills(
      validatedData.currentRole,
      validatedData.targetRole,
      validatedData.knownSkills
    )

    // Add resources to the learning plan
    const learningPlan = analysis.learningPlan.map((plan: any) => ({
      ...plan,
      resources: mockResources,
    }))

    return NextResponse.json({
      missingSkills: analysis.missingSkills,
      learningPlan,
    })
  } catch (error) {
    console.error('Error in analyze-skill-gap:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 