import { NextResponse } from 'next/server'
import { z } from 'zod'

// Input validation schema
const requestSchema = z.object({
  currentRole: z.string().min(1),
  targetRole: z.string().min(1),
  knownSkills: z.array(z.string()).min(1),
  model: z.string().optional(),
  maxTokens: z.number().min(100).max(4000).optional(),
  temperature: z.number().min(0).max(1).optional(),
})

interface Model {
  id: string;
  tags?: string[];
}

interface ModelResponse {
  generated_text: string;
  details?: {
    finish_reason: string;
    generated_tokens: number;
    seed: number;
  };
}

interface ParsedLearningPlan {
  missingSkills: string[];
  plan: {
    day: number;
    tasks: string[];
    resources: string[];
  }[];
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

    const models = await response.json()
    return models
      .filter((model: Model) => 
        model.tags?.includes('text-generation') && 
        model.tags?.includes('instruct')
      )
      .map((model: Model) => model.id)
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

export async function POST(request: Request) {
  try {
    // Validate request body
    const body = await request.json()
    const validatedData = requestSchema.parse(body)

    // Get available models
    const availableModels = await getAvailableModels()
    
    // Use requested model or fallback to available ones
    const modelsToTry = validatedData.model 
      ? [validatedData.model, ...availableModels]
      : availableModels

    // Try each model until we get a successful response
    let result
    let lastError

    for (const model of modelsToTry) {
      try {
        result = await generateLearningPlan(
          validatedData.currentRole,
          validatedData.targetRole,
          validatedData.knownSkills,
          model,
          validatedData.maxTokens,
          validatedData.temperature
        )
        break
      } catch (error) {
        lastError = error
        console.warn(`Failed with model ${model}, trying next...`)
      }
    }

    if (!result) {
      throw lastError || new Error('All models failed')
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in generate-learning-plan:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        error: 'Failed to generate learning plan',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
} 