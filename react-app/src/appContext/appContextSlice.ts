import { createSlice } from '@reduxjs/toolkit';
import { Account as Account_, Block as Block_, Transaction as Transaction_ } from "../graphql/generated";
import { URLParam } from "../utils/utils"


export type AppState = {
  selectedAccount: string | null,
  accounts: Account_[],
  contracts: Account_[],
  blocks: Block_[],
  transactions: Transaction_[],
  urlParam: URLParam | null
}

const initialState: AppState = {
  selectedAccount: null,
  accounts: [],
  contracts: [],
  blocks: [],
  transactions: [],
  urlParam: null
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
        state.urlParam = action.payload.urlParam;
      },
      updateSelectedAccount: (state, action) => {
        state.selectedAccount = action.payload.selectedAccount;
      },
      updateURLParams: (status, action) => {
        status.urlParam = action.payload.urlParam
      }
    }
})

export const { initAppState, updateSelectedAccount, updateURLParams } = appContextSlice.actions;

export const selectAppState = (state) => state.appState;
