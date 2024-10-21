import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice from "./userSlice.jsx"; // Import your reducer

// Config for redux-persist
const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  user: userSlice,
});


const persistedReducer = persistReducer(persistConfig, rootReducer);


const store = createStore(persistedReducer);


const persistor = persistStore(store);

// Export both the store and persistor
export { store, persistor };
