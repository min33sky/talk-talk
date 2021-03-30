import React, { useState } from 'react';
import AppRouter from 'components/AppRoutes';
import { AuthService } from 'firebaseConfig';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log('user: ', AuthService.currentUser ? AuthService.currentUser : '');

  return <AppRouter isLoggedIn={isLoggedIn} />;
}

export default App;
