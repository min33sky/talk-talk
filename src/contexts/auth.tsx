import { UserType } from 'fbase';
import React, { createContext, Dispatch, useContext, useReducer } from 'react';

// ***** State *******************************************************************//
export type AuthState = {
  isLoggedIn: boolean;
  currentUser: UserType | null;
};

const initialState: AuthState = {
  isLoggedIn: false,
  currentUser: null,
};

export const AuthStateContext = createContext<AuthState | undefined>(undefined);

// ***** Dispatch *****************************************************************//
type Action =
  | {
      type: 'LOG_IN';
      payload: UserType;
    }
  | {
      type: 'LOG_OUT';
    }
  | {
      type: 'USER_STATUS_UPDATE';
      payload: UserType;
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
        currentUser: action.payload,
      };

    case 'LOG_OUT':
      return {
        ...state,
        isLoggedIn: false,
        currentUser: null,
      };

    case 'USER_STATUS_UPDATE':
      return {
        ...state,
        currentUser: action.payload,
      };

    default:
      throw new Error('Unhandled Action');
  }
}

// ***** Provider *******************************************************************//
/**
 * 인증 관련 Context
 * @param chlidren
 * @returns Auth Context provider
 */
export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authState, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={authState}>{children}</AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}

// ***** Hooks **********************************************************************//
/**
 * 인증 관련에 관한 상태 Hook
 * @returns auth state object
 */
export function useAuthState() {
  const state = useContext(AuthStateContext);
  if (!state) throw new Error('AuthContext not found');
  return state;
}

/**
 * 인증 관련 디스패치 Hook
 * @returns dispatch Function
 */
export function useAuthDispatch() {
  const dispatch = useContext(AuthDispatchContext);
  if (!dispatch) throw new Error('AuthContext not found');
  return dispatch;
}
