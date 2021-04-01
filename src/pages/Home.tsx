import { useAuthState } from 'contexts/auth';
import { dbService } from 'fbase';
import React, { useState } from 'react';
import { Redirect } from 'react-router';

export default function Home() {
  const { isLoggedIn } = useAuthState();

  const [message, setMessage] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await dbService.collection('tweet').add({
      tweet: message,
      createdAt: Date.now(),
    });
    setMessage('');
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  if (!isLoggedIn) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <h2>Home</h2>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
          value={message}
          onChange={onChange}
        />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
