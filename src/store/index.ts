import { configureStore } from '@reduxjs/toolkit'
import navReducer from './slices/navSlice'
import formReducer from './slices/formSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  reducer: {
    nav: navReducer,
    form: formReducer,
    notification: notificationReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
