"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store/store"
import { setMessage } from "@/store/slices/firstResponseSlice"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, ArrowLeft, Save } from "lucide-react"
import { toast } from "sonner"

export default function ResultPage() {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [copied, setCopied] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedMessage, setEditedMessage] = useState("")

  const message = useSelector((state: RootState) => state.firstResponse.message)
  const [currentMessage, setCurrentMessage] = useState(message)

  useEffect(() => {
    setCurrentMessage(message)
    setEditedMessage(message)
  }, [message])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentMessage)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast.success("Message copied to clipboard")
    } catch (error) {
      toast.error("Failed to copy message")
    }
  }

  const handleEdit = () => {
    setEditedMessage(currentMessage)
    setIsEditing(true)
  }

  const handleSave = () => {
    setCurrentMessage(editedMessage)
    dispatch(setMessage(editedMessage))
    setIsEditing(false)
    toast.success("Message updated successfully")
  }

  const handleCancel = () => {
    setEditedMessage(currentMessage)
    setIsEditing(false)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Button variant="outline" onClick={() => router.push('/main')} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" /> Back to Generator
        </Button>
      </div>
      
      <div className="space-y-4">
        <div className="p-6 bg-card rounded-lg border">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold">Generated Message</h2>
            <div className="flex gap-2">
              {!isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleEdit}
                  >
                    Edit Message
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleCopy}
                  >
                    <Copy className="h-4 w-4" />
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={handleSave}
                  >
                    <Save className="h-4 w-4" />
                    Save Changes
                  </Button>
                </>
              )}
            </div>
          </div>
          {isEditing ? (
            <Textarea
              value={editedMessage}
              onChange={(e) => setEditedMessage(e.target.value)}
              className="min-h-[300px] font-mono"
            />
          ) : (
            <div className="whitespace-pre-wrap font-mono">{currentMessage}</div>
          )}
        </div>
      </div>
    </div>
  )
}
