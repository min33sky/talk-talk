import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService } from 'firebaseConfig';
import { useAuthDispatch } from 'contexts/auth';

function App() {
  const [init, setInit] = useState(false);

  const dispatch = useAuthDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: 'LOG_IN',
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
