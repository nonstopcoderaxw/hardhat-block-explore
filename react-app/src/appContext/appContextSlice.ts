import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  accounts: []
}

export const appContextSlice = createSlice({
    name: "appContextSlice", 
    initialState, 
    reducers: {
      updateAccounts: (state, action) => {
        state.accounts = action.payload;
      }
    }
})

export const { updateAccounts } = appContextSlice.actions;
