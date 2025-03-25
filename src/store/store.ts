import { configureStore } from "@reduxjs/toolkit"
import firstResponseReducer from "./slices/firstResponseSlice"

export const store = configureStore({
  reducer: {
    firstResponse: firstResponseReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Pre-fetch the state shape
store.getState() 