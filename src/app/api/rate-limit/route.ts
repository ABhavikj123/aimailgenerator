import { NextResponse } from 'next/server'

// In-memory store for rate limiting
const rateLimits = new Map<string, { count: number; timestamp: number }>()
const DAILY_LIMIT = 1 // Adjust this limit as needed
const CLEANUP_INTERVAL = 24 * 60 * 60 * 1000 // 24 hours

// Cleanup function to remove entries from previous days.
function cleanup() {
  const today = new Date().setHours(0, 0, 0, 0)
  for (const [ip, data] of rateLimits.entries()) {
    if (data.timestamp < today) {
      rateLimits.delete(ip)
    }
  }
}

// Run cleanup every 24 hours.
setInterval(cleanup, CLEANUP_INTERVAL)

export async function POST(req: Request) {
  try {
    const { ip } = await req.json()

    if (!ip || ip === 'unknown') {
      return NextResponse.json(
        { error: 'Valid IP address is required' },
        { status: 400 }
      )
    }

    const now = Date.now()
    const today = new Date().setHours(0, 0, 0, 0)
    
    // Retrieve current rate limit data or initialize it.
    const current = rateLimits.get(ip) || { count: 0, timestamp: now }

    // Reset counter if it's a new day.
    if (current.timestamp < today) {
      current.count = 0
      current.timestamp = now
    }

    // Check if the daily limit is exceeded.
    if (current.count >= DAILY_LIMIT) {
      return NextResponse.json({
        allowed: false,
        remaining: 0,
        error: 'Daily request limit reached. Please try again tomorrow.'
      })
    }

    // Increment counter and save.
    current.count++
    rateLimits.set(ip, current)

    return NextResponse.json({
      allowed: true,
      remaining: DAILY_LIMIT - current.count
    })
  } catch (error) {
    console.error('Rate limit error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
