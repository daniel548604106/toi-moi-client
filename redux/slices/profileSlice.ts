import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getProfileAPI } from '@/axios/profileRequest';

export const getProfileData = createAsyncThunk<any, string>('post/getProfile', async (username) => {
  const response = await getProfileAPI(username);
  return response.data;
});

interface ProfileState {
  profileData: null | any;
  isEditSummaryModalOpen: boolean;
  summaryData: null | any;
}

export const profileSlice = createSlice({
  name: 'post',
  initialState: {
    profileData: null,
    isEditSummaryModalOpen: false,
    summaryData: null,
  } as ProfileState,
  reducers: {
    setSummaryModalShow: (state, { payload }) => {
      state.isEditSummaryModalOpen = payload;
    },
    setProfileData: (state, { payload }) => {
      state.profileData = payload;
    },
    setSummaryData: (state, { payload }) => {
      state.summaryData = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getProfileData.fulfilled, (state, { payload }) => {
      // Add likes to the state array
      console.log('dispatch from redux', payload);
      state.profileData = payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setSummaryModalShow, setProfileData, setSummaryData } = profileSlice.actions;

export default profileSlice.reducer;
export type { ProfileState };
