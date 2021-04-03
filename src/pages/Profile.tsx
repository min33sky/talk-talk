import React from 'react';
import { authService } from 'fbase';

/**
 * Profile Page
 * URL: /profile
 * @returns Profile Component
 */
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
