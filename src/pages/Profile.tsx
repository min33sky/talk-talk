import React from 'react';
import { useAuthState } from 'contexts/auth';
import { authService } from 'firebaseConfig';
import { Redirect, useHistory } from 'react-router';

export default function Profile() {
  const { isLoggedIn } = useAuthState();
  const history = useHistory();

  const onLogout = () => {
    authService.signOut();
    history.push('/');
  };

  if (!isLoggedIn) {
    return <Redirect to="/auth" />;
  }

  return (
    <>
      <h2>Profile</h2>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}
