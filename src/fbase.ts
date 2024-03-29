import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// 파이어베이스에서 제공하는 서비스
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

// 파이어베이스 인스턴스 (거의 쓸 일 없음)
export const firebaseInstance = firebase;

// 로그인, 회원가입 타입
export type UserCredential = firebase.auth.UserCredential;

// 유저 계정 정보 타입
export type UserType = firebase.User;
