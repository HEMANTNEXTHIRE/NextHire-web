import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface NavState {
  isOpen: boolean
  activeDropdown: string | null
  isScrolled: boolean
}

const initialState: NavState = {
  isOpen: false,
  activeDropdown: null,
  isScrolled: false,
}

const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    toggleMobileMenu(state) {
      state.isOpen = !state.isOpen
    },
    setActiveDropdown(state, action: PayloadAction<string | null>) {
      state.activeDropdown = action.payload
    },
    setScrolled(state, action: PayloadAction<boolean>) {
      state.isScrolled = action.payload
    },
    closeMobileMenu(state) {
      state.isOpen = false
      state.activeDropdown = null
    },
  },
})

export const {
  toggleMobileMenu,
  setActiveDropdown,
  setScrolled,
  closeMobileMenu,
} = navSlice.actions

export default navSlice.reducer
