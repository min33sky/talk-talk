import React, { createContext, Dispatch, useContext, useReducer } from 'react';

// ***** State *******************************************************************//
export type AuthState = {
  isLoggedIn: boolean;
};

const initialState: AuthState = {
  isLoggedIn: false,
};

export const AuthStateContext = createContext<AuthState | undefined>(undefined);

// ***** Dispatch *****************************************************************//
type Action =
  | {
      type: 'LOG_IN';
    }
  | {
      type: 'LOG_OUT';
    };

type AuthDispatch = Dispatch<Action>;

export const AuthDispatchContext = createContext<AuthDispatch | undefined>(undefined);

// ***** Reducer ******************************************************************//
function authReducer(state: AuthState, action: Action): AuthState {
  switch (action.type) {
    case 'LOG_IN':
      return {
        ...state,
        isLoggedIn: true,
      };

    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
      };

    default:
      throw new Error('Unhandled Action');
  }
}

// ***** Provider *******************************************************************//
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

// ***** Hooks **********************************************************************//
export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error('AuthContext not found');
  return state;
}

export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error('AuthContext not found');
  return dispatch;
}
