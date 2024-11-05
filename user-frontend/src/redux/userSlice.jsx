import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
};

// Create a slice of the Redux store
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    // New reducer to update user data
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

// Export actions
export const { setUser, removeUser, updateUserData } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
