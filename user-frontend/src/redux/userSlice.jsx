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
  },
});

// Export actions
export const { setUser, removeUser } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
