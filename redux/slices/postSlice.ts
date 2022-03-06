import request from '@/Axios/index';
import { getSavedPostsAPI } from '@/Axios/savedRequest';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// `createAsyncThunk` is a generic function.
// We can use the first type-parameter to tell what type will be returned as a result.
// The second type-parameter in `createAsyncThunk` tells what argument takes the function inside:
export const apiGetLikesList = createAsyncThunk<any, string>('post/getLikesList', async (id) => {
  const response = await request.get(`/posts/like/${id}`);
  console.log(response.data);
  return response.data;
});

export const apiGetCurrentPost = createAsyncThunk<any, string>(
  'post/getCurrentPost',
  async (id) => {
    const response = await request.get(`/posts/${id}`);
    console.log(response);
    return response.data;
  },
);
export const getSavedPosts = createAsyncThunk<any>('post/getSavedPost', async () => {
  const response = await getSavedPostsAPI();
  console.log(response, 'saved');
  return response.data.posts;
});

interface PostState {
  isLikesListOpen: boolean;
  likesList: any;
  savedPosts: any;
  currentPost: any | null;
  isPostInputBoxOpen: boolean;
  isViewPostModalOpen: boolean;
  imageToPost: string;
}

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    isLikesListOpen: false,
    likesList: [],
    savedPosts: [],
    currentPost: null,
    isPostInputBoxOpen: false,
    isViewPostModalOpen: false,
    imageToPost: '',
  } as PostState,
  reducers: {
    setLikesListOpen: (state, { payload }) => {
      if (payload === false) {
        state.likesList = [];
      }
      state.isLikesListOpen = payload;
    },
    setPostInputBoxOpen: (state, { payload }) => {
      state.isPostInputBoxOpen = payload;
    },
    setImagesToPost: (state, { payload }) => {
      state.imageToPost = payload;
    },
    setViewPostModalOpen: (state, { payload }) => {
      if (payload === false) {
        setImagesToPost('');
      }
      state.isViewPostModalOpen = payload;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(apiGetLikesList.fulfilled, (state, action) => {
      // Add likes to the state array
      console.log('extra', action.payload);
      state.likesList = action.payload;
    }),
      builder.addCase(apiGetCurrentPost.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      }),
      builder.addCase(getSavedPosts.fulfilled, (state, action) => {
        state.savedPosts = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { setLikesListOpen, setPostInputBoxOpen, setViewPostModalOpen, setImagesToPost } =
  postSlice.actions;

export default postSlice.reducer;
