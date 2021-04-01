import React, { useState } from 'react';
import { authService, UserCredential, firebaseInstance } from 'firebaseConfig';
import { Redirect, useHistory } from 'react-router-dom';
import { useAuthState } from 'contexts/auth';

/**
 * 인증 페이지
 * /auth
 */
export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');
  const history = useHistory();

  const { isLoggedIn } = useAuthState();

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
      history.push('/');
    } catch (error) {
      console.error('error: ', error);
      setError(error.message);
    }
  };

  const toggleAccount = () => setNewAccount((prev) => !prev);

  const onClickGoogle = async () => {
    const provider = new firebaseInstance.auth.GoogleAuthProvider();
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  const onClickGithub = async () => {
    const provider = new firebaseInstance.auth.GithubAuthProvider();
    const data = await authService.signInWithPopup(provider);
    console.log(data);
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

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
