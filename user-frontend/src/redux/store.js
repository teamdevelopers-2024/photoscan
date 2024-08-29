import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Use localStorage
import userReducer from './userSlice'; // Import your reducers

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage, // Use localStorage to persist state
};

const persistedReducer = persistReducer(persistConfig, userReducer);

const store = configureStore({
  reducer: {
    user: persistedReducer,
  },
});

// Create a persistor
export const persistor = persistStore(store);
export default store;
