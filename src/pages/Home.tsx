import React, { useState } from 'react';
import { Redirect } from 'react-router';

export default function Home() {
  // ? 임시 로그인 처리
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return <Redirect to="/auth" />;
  }

  return <div>Home</div>;
}
