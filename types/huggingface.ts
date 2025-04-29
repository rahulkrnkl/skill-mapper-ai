export interface HuggingFaceModel {
  id: string
  tags: string[]
}

export interface HuggingFaceResponse {
  generated_text: string
  details?: {
    finish_reason: string
    generated_tokens: number
    seed: number
  }
} 