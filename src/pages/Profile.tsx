import React from 'react';
import { authService } from 'fbase';

export default function Profile() {
  const onLogout = () => {
    authService.signOut();
  };

  return (
    <>
      <h2>Profile</h2>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}
