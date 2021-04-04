import React from 'react';
import { authService, firebaseInstance } from 'fbase';
import AuthForm from 'components/AuthForm';

/**
 * 인증 페이지
 * URL: /auth
 */
export default function Auth() {
  const onClickGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    await authService.signInWithPopup(provider);
  };

  const onClickGithub = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    await authService.signInWithPopup(provider);
  };

  return (
    <>
      <AuthForm />
      <div>
        <button name="google" onClick={onClickGoogle}>
          구글 로그인
        </button>
        <button name="github" onClick={onClickGithub}>
          깃허브 로그인
        </button>
      </div>
    </>
  );
}
