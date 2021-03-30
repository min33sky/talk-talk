import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'firebaseConfig';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  if (!init) {
    return <div>Loading.......</div>;
  }

  return (
    <>
      <AppRouter isLoggedIn={isLoggedIn} />
      <footer>푸 터 들 어 갈 자 리 !!</footer>
    </>
  );
}

export default App;
