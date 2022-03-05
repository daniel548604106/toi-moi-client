import { createSlice } from '@reduxjs/toolkit';

interface StoryState {
  isUploadStoryModalOpen: boolean;
}

export const storySlice = createSlice({
  name: 'story',
  initialState: {
    isUploadStoryModalOpen: false,
  } as StoryState,
  reducers: {
    toggleUploadStoryModal: (state) => {
      state.isUploadStoryModalOpen = !state.isUploadStoryModalOpen;
    },
  },
});

export const { toggleUploadStoryModal } = storySlice.actions;

export default storySlice.reducer;
