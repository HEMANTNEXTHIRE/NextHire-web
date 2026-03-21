import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface FormState {
  status: FormStatus
  message: string
}

interface FormsState {
  contactForm: FormState
  expertForm: FormState
}

const idle: FormState = { status: 'idle', message: '' }

const initialState: FormsState = {
  contactForm: idle,
  expertForm: idle,
}

type FormKey = keyof FormsState

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormSubmitting(state, action: PayloadAction<FormKey>) {
      state[action.payload] = { status: 'submitting', message: '' }
    },
    setFormSuccess(state, action: PayloadAction<{ key: FormKey; message: string }>) {
      state[action.payload.key] = { status: 'success', message: action.payload.message }
    },
    setFormError(state, action: PayloadAction<{ key: FormKey; message: string }>) {
      state[action.payload.key] = { status: 'error', message: action.payload.message }
    },
  },
})

export const { setFormSubmitting, setFormSuccess, setFormError } = formSlice.actions

export default formSlice.reducer
