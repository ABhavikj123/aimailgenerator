import { generateWithCohere } from "./cohere"

interface GenerateOptions {
  ip: string
  maxLength?: number
  jobDescription: string
  additionalInfo: string
  messageType: string
}

export async function generateAIResponse(prompt: string, options: GenerateOptions): Promise<{
  success: boolean
  message: string
  error?: string
}> {
  try {
    // Basic input validation
    if (!prompt || prompt.length > 2000) {
      return {
        success: false,
        message: '',
        error: 'Invalid input length. Please keep your text under 500 characters.'
      }
    }
    
    // Sanitize input
    const sanitizedPrompt = prompt.replace(/[<>]/g, '')
    
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobDescription: options.jobDescription,
        additionalInfo: options.additionalInfo,
        messageType: options.messageType,
        maxTokens: options.maxLength || 500
      })
    })
    
    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to generate response')
    }
    
    return {
      success: true,
      message: data.message
    }
  } catch (error) {
    console.error("Error generating AI response:", error)
    return {
      success: false,
      message: '',
      error: error instanceof Error ? error.message : 'An unexpected error occurred'
    }
  }
}

export async function generateWithTimeout(prompt: string, maxTokens: number, timeoutMs: number = 8000) {
  return Promise.race([
    generateWithCohere(prompt, maxTokens),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Cohere API request timed out')), timeoutMs)
    )
  ]);
}