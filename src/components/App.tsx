import React, { useEffect, useState } from 'react';
import AppRouter from 'components/AppRouter';
import { authService, UserType } from 'fbase';
import { useAuthDispatch } from 'contexts/auth';

/**
 * App Component
 * @returns App Component
 */
function App() {
  const [init, setInit] = useState(false); // 파이어베이스로부터 인증 확인 상태값

  const dispatch = useAuthDispatch();

  useEffect(() => {
    authService.onAuthStateChanged((user: UserType | null) => {
      if (user) {
        dispatch({
          type: 'LOG_IN',
          payload: user,
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
