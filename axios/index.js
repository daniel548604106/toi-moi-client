// Reset
import { postForgotPassword, postPasswordReset } from './resetRequest';
export const apiPostForgotPassword = postForgotPassword;

export const apiPostPasswordReset = postPasswordReset;

// Search

import {
  searchRequest,
  getRecentSearch,
  getAllSearch,
  postKeywordSearch,
  postUserSearch,
  deleteHistory,
} from './searchRequest';

export const apiSearchRequest = searchRequest;
export const apiGetRecentSearch = getRecentSearch;
export const apiGetAllSearch = getAllSearch;
export const apiPostKeywordSearch = postKeywordSearch;
export const apiPostUserSearch = postUserSearch;
export const apiDeleteHistory = deleteHistory;

// Room
import { postNewRoom } from './roomRequest';
export const apiPostNewRoom = postNewRoom;

// Story
import { uploadStory, uploadStoryImage, getStories } from './storyRequest';
export const apiUploadStory = uploadStory;
export const apiUploadStoryImage = uploadStoryImage;
export const apiGetStories = getStories;

// Saved

import { postNewSavedPost, getSavedPosts, deleteSavedPost } from './savedRequest';
export const apiPostNewSavedPost = postNewSavedPost;
export const apiGetSavedPosts = getSavedPosts;
export const apiDeleteSavedPost = deleteSavedPost;
