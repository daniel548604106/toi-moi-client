import { apiGetFriendList, apiGetMyInfo } from '@/Axios/index';
import { UserInfo } from '@/Interfaces/I_common';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getMyInfo = createAsyncThunk('get/getMyInfo', async (id, thunkAPI) => {
  const response = await apiGetMyInfo();
  console.log(response);
  return response.data;
});
export const getFriendList = createAsyncThunk('get/getFriendList', async (id, thunkAPI) => {
  const response = await apiGetFriendList();
  console.log(response, 'friendlist');
  return response.data;
});

interface UserState {
  isUserLoggedIn: boolean;
  userInfo: UserInfo | null;
  notifications: any;
  friendsList: any;
  isEditProfileImageOpen: boolean;
  profileImageToUpdate: string;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isUserLoggedIn: false,
    userInfo: {},
    notifications: [],
    friendsList: [],
    isEditProfileImageOpen: false,
    profileImageToUpdate: '',
  } as UserState,
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    setUserLogin: (state, { payload }) => {
      (state.isUserLoggedIn = true), (state.userInfo = payload);
    },
    setUserLogout: (state) => {
      (state.isUserLoggedIn = false), (state.userInfo = null);
    },
    setEditProfileImageOpen: (state, { payload }) => {
      state.isEditProfileImageOpen = payload;
    },
    setUnreadNotification: (state, { payload }) => {
      state.userInfo = { ...state.userInfo, unreadNotification: payload };
    },
    setProfileImageToUpdate: (state, { payload }) => {
      if (payload === false) {
        state.profileImageToUpdate = '';
      }
      state.profileImageToUpdate = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getMyInfo.fulfilled, (state, action) => {
      // Add likes to the state array
      state.userInfo = action.payload;
    });
    builder.addCase(getFriendList.fulfilled, (state, action) => {
      console.log(action.payload, 'extra');
      // Add likes to the state array
      state.friendsList = action.payload.map((item) => item.user);
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  setUserLogin,
  setUserLogout,
  setEditProfileImageOpen,
  setProfileImageToUpdate,
  setUnreadNotification,
} = userSlice.actions;

export default userSlice.reducer;
