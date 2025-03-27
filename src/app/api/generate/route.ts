import { NextResponse } from 'next/server'
import { generateWithCohere, generateWithTimeout } from '@/lib/cohere'
import { getFirstPrompt } from '@/lib/prompts/firstResponse'

export async function POST(req: Request) {
  try {
    const { jobDescription, additionalInfo, messageType, maxTokens } = await req.json()

    if (!jobDescription || !additionalInfo || !messageType) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    const prompt = getFirstPrompt({ jobDescription, additionalInfo, messageType })
    const result = await generateWithTimeout(prompt, maxTokens || 500)

    return NextResponse.json(result)
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
} 