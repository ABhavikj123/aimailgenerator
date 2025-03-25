interface RateLimitEntry {
  count: number
  timestamp: number
}

const DAILY_LIMIT = 2 // 2 requests per day
const rateLimits = new Map<string, RateLimitEntry>()

export function checkRateLimit(ip: string): {
  allowed: boolean
  remaining: number
  error?: string
} {
  const now = Date.now()
  const today = new Date().setHours(0, 0, 0, 0)
  
  // Clean up old entries
  for (const [storedIp, entry] of rateLimits.entries()) {
    if (entry.timestamp < today) {
      rateLimits.delete(storedIp)
    }
  }

  const current = rateLimits.get(ip) || { count: 0, timestamp: now }

  // Reset if it's a new day
  if (current.timestamp < today) {
    current.count = 0
    current.timestamp = now
  }

  if (current.count >= DAILY_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      error: 'Daily request limit reached. Please try again tomorrow.'
    }
  }

  // Increment counter
  current.count++
  rateLimits.set(ip, current)

  return {
    allowed: true,
    remaining: DAILY_LIMIT - current.count
  }
} 