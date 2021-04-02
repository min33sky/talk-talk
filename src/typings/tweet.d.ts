// 트윗 메세지 타입
export type TweetType = {
  id: string;
  createdAt: number;
  text: string;
  creatorId: string;
};

// 로그인 유저 타입
export type UserType = {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
};
