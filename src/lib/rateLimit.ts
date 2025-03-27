interface RateLimitEntry {
  count: number
  timestamp: number
}

const DAILY_LIMIT = 1 // 1 requests per day
const STORAGE_KEY = 'rate_limit_data'

function getRateLimits(): Record<string, RateLimitEntry> {
  if (typeof window === 'undefined') return {}
  
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Error loading rate limits:', error)
    return {}
  }
}

function saveRateLimits(limits: Record<string, RateLimitEntry>) {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limits))
  } catch (error) {
    console.error('Error saving rate limits:', error)
  }
}

export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean
  remaining: number
  error?: string
}> {
  try {
    // First check client-side rate limit
    const now = Date.now()
    const today = new Date().setHours(0, 0, 0, 0)
    
    const rateLimits = getRateLimits()
    const current = rateLimits[ip] || { count: 0, timestamp: now }

    // Reset if it's a new day
    if (current.timestamp < today) {
      current.count = 0
      current.timestamp = now
    }

    // If client-side limit reached, don't make server request
    if (current.count >= DAILY_LIMIT) {
      return {
        allowed: false,
        remaining: 0,
        error: 'Daily request limit reached. Please try again tomorrow.'
      }
    }

    // Check server-side rate limit
    const response = await fetch('/api/rate-limit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ip }),
    })

    if (!response.ok) {
      throw new Error('Rate limit check failed')
    }

    const serverResult = await response.json()

    // If server allows the request, update client-side counter
    if (serverResult.allowed) {
      current.count++
      rateLimits[ip] = current
      saveRateLimits(rateLimits)
    }

    return serverResult
  } catch (error) {
    console.error('Rate limit error:', error)
    return {
      allowed: false,
      remaining: 0,
      error: 'Failed to check rate limit. Please try again later.'
    }
  }
} 