import { createSlice } from '@reduxjs/toolkit';
import { Account as Account_, Block as Block_, Transaction as Transaction_ } from "../graphql/generated";


export type AppState = {
  selectedAccount: string | null,
  accounts: Account_[],
  contracts: Account_[],
  blocks: Block_[],
  transactions: Transaction_[],
}

const initialState: AppState = {
  selectedAccount: null,
  accounts: [],
  contracts: [],
  blocks: [],
  transactions: [],
}

export const appContextSlice = createSlice({
    name: "appContextSlice", 
    initialState, 
    reducers: {
      initAppState: (state, action) => {
        state.selectedAccount = action.payload.selectedAccount;
        state.accounts = action.payload.accounts;
        state.contracts = action.payload.contracts;
        state.blocks = action.payload.blocks;
        state.transactions = action.payload.transactions;
      }
    }
})

export const { initAppState } = appContextSlice.actions;

export const selectAppState = (state) => state.appState;
