import request from './index';

export const getProfileAPI = (username) => {
  return request.get(`/profile/${username}`);
};

export const getProfilePostsAPI = (username, currentPage) => {
  return request.get(`/profile/posts/${username}?page=${currentPage}`);
};

export const patchProfileAPI = ({
  username,
  bio,
  profileCoverPostId,
  profileCoverDescription,
  profileCoverImage,
}) => {
  return request.patch(`/profile/${username}`, {
    bio,
    profileCoverPostId,
    profileCoverDescription,
    profileCoverImage,
  });
};

export const patchProfileBioAPI = ({ username, bio }) => {
  return request.patch(`/profile/${username}`, { bio });
};

export const patchProfileSummaryAPI = (username) => {
  return request.patch(`/profile/${username}/summary`);
};

// Add Work Experience
export const postWorkExperienceSummaryAPI = (username, experience) => {
  return request.post(`/profile/${username}/work_experience`, { experience });
};

// Add Education
export const postEducationSummaryAPI = (username, experience) => {
  return request.post(`/profile/${username}/education`, { experience });
};

export const getProfileFriendsAPI = (username) => {
  return request.get(`/profile/friends_preview/${username}`);
};

// update profile image
export const patchProfileImageAPI = ({
  username,
  profileImageDescription,
  profileImagePostId,
  profileImage,
}) => {
  return request.patch(`/profile/${username}/profile_image`, {
    profileImageDescription,
    profileImagePostId,
    profileImage,
  });
};

// Get Profile Summary
export const getProfileSummaryAPI = (username) => {
  return request.get(`/profile/summary/${username}`);
};
