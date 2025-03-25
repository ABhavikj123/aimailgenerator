import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface RateLimitEntry {
  count: number
  timestamp: number
}

const DAILY_LIMIT = 2 // 2 requests per day
const RATE_LIMIT_FILE = path.join(process.cwd(), 'data', 'rate-limits.json')

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data')
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

// Initialize rate limits file if it doesn't exist
if (!fs.existsSync(RATE_LIMIT_FILE)) {
  fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify({}))
}

function loadRateLimits(): Record<string, RateLimitEntry> {
  try {
    const data = fs.readFileSync(RATE_LIMIT_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error loading rate limits:', error)
    return {}
  }
}

function saveRateLimits(limits: Record<string, RateLimitEntry>) {
  try {
    fs.writeFileSync(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2))
  } catch (error) {
    console.error('Error saving rate limits:', error)
  }
}

export async function POST(req: Request) {
  try {
    const { ip } = await req.json()

    if (!ip) {
      return NextResponse.json(
        { error: 'IP address is required' },
        { status: 400 }
      )
    }

    const now = Date.now()
    const today = new Date().setHours(0, 0, 0, 0)
    
    // Load current rate limits
    const rateLimits = loadRateLimits()
    
    // Clean up old entries
    Object.keys(rateLimits).forEach(storedIp => {
      if (rateLimits[storedIp].timestamp < today) {
        delete rateLimits[storedIp]
      }
    })

    const current = rateLimits[ip] || { count: 0, timestamp: now }

    // Reset if it's a new day
    if (current.timestamp < today) {
      current.count = 0
      current.timestamp = now
    }

    if (current.count >= DAILY_LIMIT) {
      return NextResponse.json({
        allowed: false,
        remaining: 0,
        error: 'Daily request limit reached. Please try again tomorrow.'
      })
    }

    // Increment counter
    current.count++
    rateLimits[ip] = current
    saveRateLimits(rateLimits)

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