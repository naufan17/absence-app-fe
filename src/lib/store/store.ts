import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { persistStore, persistReducer, type Persistor } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig: {
  key: string;
  storage: typeof storage;
  whishlist: string[];
} = {
  key: 'root',
  storage,
  whishlist: []
}

const rootReducer = combineReducers({
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