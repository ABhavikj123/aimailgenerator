"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { generateFirstResponse, setFormData } from "@/store/slices/firstResponseSlice"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CharacterCounter } from "@/components/CharacterCounter"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const messageTypes = [
  { value: "cold email", label: "Cold Email" },
  { value: "cold message", label: "Cold Message" },
  { value: "cover letter", label: "Cover Letter" },
] as const

const CHAR_LIMIT = 500

export default function MainPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [error, setError] = useState<string>("")
  
  const isLoading = useSelector((state: RootState) => state.firstResponse.loading)
  const responseError = useSelector((state: RootState) => state.firstResponse.error)

  const [formData, setLocalFormData] = useState({
    jobDescription: "",
    additionalInfo: "",
    messageType: "",
  })

  const handleInputChange = (
    field: 'jobDescription' | 'additionalInfo',
    value: string
  ) => {
    if (value.length <= CHAR_LIMIT) {
      setLocalFormData(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleSubmit = async () => {
    try {
      setError("")
      const response = await fetch('/api/ip')
      const { ip } = await response.json()
      
      dispatch(setFormData(formData))
      await dispatch(generateFirstResponse({
        ...formData,
        ip
      })).unwrap()
      
      router.push("/result")
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred while generating the message")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-card rounded-lg border shadow-sm p-6 md:p-8">
          <h1 className="mb-6 text-3xl font-bold">Message Generator</h1>
          
          <p className="mb-6 text-muted-foreground">
            Fill in the details below to generate your professional message
          </p>

          {(error || responseError) && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
              {error || responseError}
            </div>
          )}

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Job Description or Context
              </label>
              <Textarea
                placeholder="Enter job description or context..."
                value={formData.jobDescription}
                onChange={(e) => handleInputChange('jobDescription', e.target.value)}
                className="min-h-[100px]"
                maxLength={CHAR_LIMIT}
              />
              <CharacterCounter 
                current={formData.jobDescription.length} 
                limit={CHAR_LIMIT} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">
                Resume or Additional Information
              </label>
              <Textarea
                placeholder="Paste your resume or additional information..."
                value={formData.additionalInfo}
                onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                className="min-h-[100px]"
                maxLength={CHAR_LIMIT}
              />
              <CharacterCounter 
                current={formData.additionalInfo.length} 
                limit={CHAR_LIMIT} 
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Message Type</label>
              <Select
                value={formData.messageType}
                onValueChange={(value: string) =>
                  setLocalFormData({ ...formData, messageType: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select message type" />
                </SelectTrigger>
                <SelectContent>
                  {messageTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={
                isLoading ||
                !formData.jobDescription ||
                !formData.additionalInfo ||
                !formData.messageType
              }
              className="w-full"
            >
              {isLoading ? "Generating..." : "Generate Message"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
