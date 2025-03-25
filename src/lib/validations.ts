import { z } from "zod"



export const messageTypes= [
  { value: "cold email", label: "Cold Email" },
  { value: "cold message", label: "Cold Message" },
  { value: "cover letter", label: "Cover Letter" },
]

export const messageTypeValues = ["cold email", "cold message", "cover letter"] as const

export const formDataSchema = z.object({
  jobDescription: z.string()
    .min(10, "Job description must be at least 10 characters")
    .max(500, "Job description must not exceed 500 characters")
    .trim(),
  additionalInfo: z.string()
    .min(10, "Additional information must be at least 10 characters")
    .max(500, "Additional information must not exceed 500 characters")
    .trim(),
  messageType: z.enum(messageTypeValues, {
    errorMap: () => ({ message: "Please select a valid message type" })
  })
})

export const rateLimitResponseSchema = z.object({
  allowed: z.boolean(),
  remaining: z.number().min(0),
  error: z.string().optional()
})

export const ipResponseSchema = z.object({
  ip: z.string().ip()
})

export type FormData = z.infer<typeof formDataSchema>
export type RateLimitResponse = z.infer<typeof rateLimitResponseSchema>
export type IpResponse = z.infer<typeof ipResponseSchema> 