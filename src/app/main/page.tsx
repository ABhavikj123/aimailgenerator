"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import { generateFirstResponse, setFormData } from "@/store/slices/firstResponseSlice"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { CharacterCounter } from "@/components/CharacterCounter"
import { X } from "lucide-react"
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
  const [showInfoCard, setShowInfoCard] = useState(true)
  
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
      const result = await dispatch(generateFirstResponse({
        ...formData,
        ip
      })).unwrap()
      
      router.push("/result")
    } catch (error: any) {
      // Check if the error is a rate limit error from the API
      if (error?.data?.error?.includes('Daily request limit reached') || 
          error?.message?.includes('Daily request limit reached')) {
        setError("You've reached your daily limit of 2 message generations. Please try again tomorrow!")
      } else {
        setError("An error occurred while generating the message")
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        {showInfoCard && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4 relative">
            <button
              onClick={() => setShowInfoCard(false)}
              className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
            >
              <X size={20} />
            </button>
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Usage Limit Notice</h3>
                <div className="mt-2 text-sm text-blue-700">
                  <p>To ensure fair usage during our testing phase, each user is limited to 2 message generations per day. This helps us maintain service quality and gather valuable feedback.</p>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
