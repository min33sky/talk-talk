import React, { useCallback, useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useAuthState } from 'contexts/auth';

/**
 * Profile Page
 * URL: /profile
 * @returns Profile Component
 */
export default function Profile() {
  const { currentUser } = useAuthState();
  const [newDisplayName, setNewDisplayName] = useState('');

  const getMyTweets = useCallback(async () => {
    const tweets = await dbService
      .collection('tweets')
      .where('creatorId', '==', currentUser?.uid)
      .orderBy('createdAt')
      .get();

    console.log(
      'tweets: ',
      tweets.docs.map((doc) => doc.data())
    );
  }, [currentUser]);

  useEffect(() => {
    getMyTweets();
  }, [getMyTweets]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (currentUser?.displayName !== newDisplayName) {
      await currentUser?.updateProfile({
        displayName: newDisplayName,
      });
    }
  };

  const onLogout = () => {
    authService.signOut();
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  return (
    <>
      app
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Display Name" value={newDisplayName} onChange={onChange} />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}
