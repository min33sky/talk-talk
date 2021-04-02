import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase';
import { useAuthDispatch } from 'contexts/auth';

function App() {
  const [init, setInit] = useState(false);

  const dispatch = useAuthDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user: any) => {
      console.log('observer: ', user?.uid, user?.photoURL, user?.email, user?.displayName);
      if (user) {
        dispatch({
          type: 'LOG_IN',
          payload: {
            uid: user?.uid,
            photoURL: user?.photoURL,
            email: user?.email,
            displayName: user?.displayName,
          },
        });
      } else {
        dispatch({
          type: 'LOG_OUT',
        });
      }
      setInit(true);
    });
  }, [dispatch]);

  if (!init) {
    return <div>Loading.......</div>;
  }

  return (
    <>
      <AppRouter />
      <footer>푸 터 들 어 갈 자 리 !!</footer>
    </>
  );
}

export default App;
