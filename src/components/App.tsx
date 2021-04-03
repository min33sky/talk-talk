import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'fbase';
import { useAuthDispatch } from 'contexts/auth';

function App() {
  const [init, setInit] = useState(false);

  const dispatch = useAuthDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user: any) => {
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
    </>
  );
}

export default App;
