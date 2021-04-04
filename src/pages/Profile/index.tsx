import React, { useCallback, useEffect, useState } from 'react';
import { authService, dbService } from 'fbase';
import { useAuthDispatch, useAuthState } from 'contexts/auth';
import { Container, ProfileForm, LogoutButton } from 'pages/Profile/style';

/**
 * Profile Page
 * URL: /profile
 * @returns Profile Component
 */
export default function Profile() {
  const { currentUser } = useAuthState();
  const dispatch = useAuthDispatch();
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
      // ? Firebase의 Auth 객체가 업데이트된다.
      await currentUser?.updateProfile({
        displayName: newDisplayName,
      });

      // ? authService.currentUser: 현재 로그인 된 사람의 정보(Firebase)를 가져온다.
      dispatch({
        type: 'USER_STATUS_UPDATE',
        payload: authService.currentUser!,
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
    <Container>
      <ProfileForm onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Display Name"
          value={newDisplayName}
          onChange={onChange}
          autoFocus
        />
        <input type="submit" value="Update Profile" />
      </ProfileForm>
      <LogoutButton onClick={onLogout}>Logout</LogoutButton>
    </Container>
  );
}
