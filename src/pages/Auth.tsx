import React, { useState } from 'react';
import { authService, UserCredential, firebaseInstance } from 'fbase';

/**
 * 인증 페이지
 * /auth
 */
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let data: UserCredential;

    try {
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await authService.signInWithEmailAndPassword(email, password);
      }
      console.log('유저 정보: ', data);
    } catch (error) {
      console.error('error: ', error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

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
      <form onSubmit={onSubmit}>
        <input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
        {error}
      </form>

      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>

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
