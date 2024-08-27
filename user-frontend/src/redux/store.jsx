import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { Provider } from "react-redux";
import userSlice from "./userSlice"; // Import your reducer

// Config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers if you have multiple reducers
const rootReducer = combineReducers({
  user: userSlice,
  // other reducers can go here
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create a Redux store with the persisted reducer
const store = createStore(persistedReducer);

// Create a persistor instance
const persistor = persistStore(store);

// Export both the store and persistor
export { store, persistor };
