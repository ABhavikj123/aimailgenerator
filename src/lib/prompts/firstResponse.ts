interface FirstPromptData {
  jobDescription: string
  additionalInfo: string
  messageType: string
}

export function getFirstPrompt(data: FirstPromptData): string {

return `Write a concise, professional ${data.messageType} using these details:
Job Context: ${data.jobDescription}
Background: ${data.additionalInfo}
Output only the message, no extra text.`.trim()
} 