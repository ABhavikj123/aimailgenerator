import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { generateAIResponse } from "@/lib/ai"
import { getFirstPrompt } from "@/lib/prompts/firstResponse"

interface FirstResponseState {
  message: string
  formData: {
    jobDescription: string
    additionalInfo: string
    messageType: string
  }
  loading: boolean
  error: string | null
}

const initialState: FirstResponseState = {
  message: '',
  formData: {
    jobDescription: '',
    additionalInfo: '',
    messageType: ''
  },
  loading: false,
  error: null,
}

export const generateFirstResponse = createAsyncThunk(
  "firstResponse/generate",
  async (data: { 
    jobDescription: string
    additionalInfo: string
    messageType: string
    ip: string 
  }) => {
    const prompt = getFirstPrompt(data)
    const response = await generateAIResponse(prompt, {
      ip: data.ip,
      jobDescription: data.jobDescription,
      additionalInfo: data.additionalInfo,
      messageType: data.messageType
    })
    if (!response.success) {
      throw new Error(response.error || "Failed to generate message")
    }
    return response.message
  }
)

const firstResponseSlice = createSlice({
  name: "firstResponse",
  initialState,
  reducers: {
    setFormData: (state, action: PayloadAction<FirstResponseState['formData']>) => {
      state.formData = action.payload
    },
    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload
      state.error = null
    },
    clearResponse: (state) => {
      state.message = ""
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(generateFirstResponse.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(generateFirstResponse.fulfilled, (state, action) => {
        state.loading = false
        state.message = action.payload
        state.error = null
      })
      .addCase(generateFirstResponse.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || "Failed to generate message"
      })
  },
})

export const { setFormData, setMessage, clearResponse } = firstResponseSlice.actions
export default firstResponseSlice.reducer 