export async function checkRateLimit(ip: string): Promise<{
  allowed: boolean
  remaining: number
  error?: string
}> {
  try {
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

    return await response.json()
  } catch (error) {
    console.error('Rate limit error:', error)
    return {
      allowed: false,
      remaining: 0,
      error: 'Failed to check rate limit. Please try again later.'
    }
  }
} 