import { authService, UserCredential } from 'fbase';
import React, { useState } from 'react';
import { Form, Input, Button, AuthError, AuthSwitch } from './style';

export default function AuthForm() {
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

  return (
    <>
      <Form onSubmit={onSubmit}>
        <Input type="email" name="email" placeholder="Email" value={email} onChange={onChange} />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
        />

        <Button type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />

        {error && <AuthError>{error}</AuthError>}
      </Form>

      <AuthSwitch onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</AuthSwitch>
    </>
  );
}
