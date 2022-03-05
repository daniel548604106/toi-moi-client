interface SendMessage {
  userId: string;
  messageSentTo: string;
  msg: string;
}

interface NotificationReceived {
  profileImage: string;
  postId: string;
  username: string;
  name: string;
}

export interface User {
  userId: string;
  socketId: string;
}

export interface Message {
  sender: string;
  receiver: string;
  msg: string;
  date: string;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  connectedUsers: ({ users }: { users: User[] }) => void;
  newMsgReceived: ({ newMessage }: { newMessage: Message }) => void;
  newNotificationReceived: ({ profileImage, postId, username, name }: NotificationReceived) => void;
}

interface ClientToServerEvents {
  hello: () => void;
  join: ({ userId }: { userId: string }) => void;
  disconnected: () => void;
  sendMessage: ({ userId, messageSentTo, msg }: SendMessage) => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}

export type { ServerToClientEvents, ClientToServerEvents, InterServerEvents, SocketData };
