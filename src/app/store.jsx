import { configureStore } from '@reduxjs/toolkit'
import movieReducer from '../features/slices/movieSlice'
export const store = configureStore({
  reducer: {
    movieData: movieReducer
  },
})