/* eslint-disable @typescript-eslint/no-explicit-any */
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, type Persistor } from 'redux-persist'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import storage from 'redux-persist/lib/storage'
import authSlice from '@/store/slices/auth.slice'

const persistConfig: {
  key: string
  storage: typeof storage
  transforms: any
  whitelist: string[]
} = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_SECRET_KEY,
      onError: function (error: any) {
        console.error(error)
      },
    }),
  ],
  whitelist: ['auth']
}

const rootReducer = combineReducers({
  auth: authSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
})

export const persistor: Persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch