import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface Notification {
  id: string
  title: string
  message: string
  details?: string
}

interface NotificationState {
  notifications: Notification[]
}

const initialState: NotificationState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<Notification, 'id'>>) {
      const id = `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
      state.notifications.push({ ...action.payload, id })
    },
    removeNotification(state, action: PayloadAction<string>) {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload)
    },
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export default notificationSlice.reducer
