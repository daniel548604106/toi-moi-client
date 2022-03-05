interface UserInfo {
  birthday: Date;
  createdAt: Date;
  email: string;
  expireToken: Date;
  gender: 'male' | 'female' | 'other';
  name: string;
  newMessagePopup: true;
  profileImage: string;
  resetToken: string;
  role: any;
  unreadMessage: true;
  unreadNotification: false;
  updatedAt: Date;
  username: string;
  __v: number;
  _id: string;
}

export type { UserInfo };
