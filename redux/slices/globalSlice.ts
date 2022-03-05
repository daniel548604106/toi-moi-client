import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface GlobalState {
  isSearchBarOpen: boolean;
  isLanguageOpen: boolean;
  isCreateRoomOpen: boolean;
  isCommonLoading: boolean;
  notification: '';
}

export const globalSlice = createSlice({
  name: 'global',
  initialState: {
    isCommonLoading: false,
    isSearchBarOpen: false,
    isLanguageOpen: false,
    isCreateRoomOpen: false,
    notification: '',
  } as GlobalState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    toggleSearchBar: (state) => {
      state.isSearchBarOpen = !state.isSearchBarOpen;
    },
    toggleLanguageOpen: (state) => {
      state.isLanguageOpen = !state.isLanguageOpen;
    },
    toggleCreateRoomOpen: (state) => {
      state.isCreateRoomOpen = !state.isCreateRoomOpen;
    },
    setIsCommonLoading: (state, action: PayloadAction<boolean>) => {
      const isLoading = action.payload;
      state.isCommonLoading = isLoading;
    },
    setNotification: (state, { payload }) => {
      state.notification = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleSearchBar,
  toggleCreateRoomOpen,
  setIsCommonLoading,
  toggleLanguageOpen,
  setNotification,
} = globalSlice.actions;

export default globalSlice.reducer;
export type { GlobalState };
