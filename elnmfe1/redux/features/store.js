"use client"
import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./api/apiSlice"
import authSlice from "./auth/authSlice"

//create store Redux with reducer by apiSlice and authSlice
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,

    // reducer by authSlice,
    auth: authSlice
  },
  // devTools: false,
  //use middleware by apiSlice
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware)
})

// call the load user function on every page load
const initializeApp = async () => {
  await store.dispatch(
    apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
  )
}

initializeApp()
