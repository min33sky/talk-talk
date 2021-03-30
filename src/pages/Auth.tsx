import React, { useState } from 'react';
import { AuthService, UserCredential } from 'firebaseConfig';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newAccount, setNewAccount] = useState(true);

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
        data = await AuthService.createUserWithEmailAndPassword(email, password);
      } else {
        data = await AuthService.signInWithEmailAndPassword(email, password);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
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
        <button>{newAccount ? '가입하기' : '로그인'}</button>
      </form>
      <div>
        <button>구글 로그인</button>
        <button>깃허브 로그인</button>
      </div>
    </>
  );
}
