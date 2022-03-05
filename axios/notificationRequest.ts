import request from './index';

export const getNotificationsAPI = () => {
  return request.get(`/notifications`);
};

export const postReadNotificationsAPI = () => {
  return request.post(`/notifications`);
};

export const postReadSingleNotificationAPI = (notificationId) => {
  return request.post(`/notifications/${notificationId}/read`);
};
