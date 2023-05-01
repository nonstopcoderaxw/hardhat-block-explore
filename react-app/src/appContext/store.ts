import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { appContextSlice } from "./appContextSlice"

export const store = configureStore({
  reducer: {
    appState: appContextSlice.reducer
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

