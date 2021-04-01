import { useAuthState } from 'contexts/auth';
import React from 'react';
import { Redirect } from 'react-router';

export default function Home() {
  const { isLoggedIn } = useAuthState();

  if (!isLoggedIn) {
    return <Redirect to="/auth" />;
  }

  return <div>Home</div>;
}
