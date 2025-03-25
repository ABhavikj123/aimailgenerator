import { NextResponse } from 'next/server'
import { getCurrentUsage } from '@/lib/cohere'

export async function GET() {
  try {
    const usage = getCurrentUsage()
    
    return NextResponse.json({
      success: true,
      usage: {
        ...usage,
        estimatedCost: 'Free Tier',
        remainingRequests: Math.max(0, 4 - usage.requests), // Based on daily limit of 4
        tokenLimit: '5M per month',
      }
    })
  } catch (error) {
    console.error('Usage API error:', error)
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'An unexpected error occurred'
      },
      { status: 500 }
    )
  }
} 