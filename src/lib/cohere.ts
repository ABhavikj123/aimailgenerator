import { CohereClient } from 'cohere-ai'

const cohere = new CohereClient({
  token: process.env.COHERE_API_KEY || '',
})

// Track usage for rate limiting
let dailyUsage = {
  date: new Date().toDateString(),
  tokens: 0,
  requests: 0
}

export function checkAndResetUsage() {
  const today = new Date().toDateString()
  if (dailyUsage.date !== today) {
    dailyUsage = {
      date: today,
      tokens: 0,
      requests: 0
    }
  }
}

export function trackUsage(tokens: number) {
  dailyUsage.tokens += tokens
  dailyUsage.requests += 1
}

export function getCurrentUsage() {
  return { ...dailyUsage }
}

export async function generateWithCohere(prompt: string, maxTokens: number = 500) {
  try {
    checkAndResetUsage()

    const response = await cohere.generate({
      prompt,
      maxTokens,
      temperature: 0.7,
      returnLikelihoods: 'NONE',
    })

    const message = response.generations[0]?.text?.trim() || ''
    
    // Track approximate token usage
    const totalTokens = Math.ceil((prompt.length + message.length) / 4)
    trackUsage(totalTokens)

    return {
      success: true,
      message
    }
  } catch (error) {
    console.error('Cohere API error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate response'
    }
  }
} 