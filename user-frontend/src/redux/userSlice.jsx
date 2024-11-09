import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
  user: null,
  addresses: [], // Add addresses array
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
      state.addresses = []; // Clear addresses when user is removed
    },
    updateUserData: (state, action) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
    // Add new address
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    // Update an existing address
    updateAddress: (state, action) => {
      const { index, newAddress } = action.payload;
      if (state.addresses[index]) {
        state.addresses[index] = newAddress;
      }
    },
    // Delete an address
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter((_, i) => i !== action.payload);
    },
    // Set an address as default
    setDefaultAddress: (state, action) => {
      state.addresses = state.addresses.map((address, i) => ({
        ...address,
        isDefault: i === action.payload,
      }));
    },
  },
});

// Export actions
export const { 
  setUser, 
  removeUser, 
  updateUserData, 
  addAddress, 
  updateAddress, 
  deleteAddress, 
  setDefaultAddress 
} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
