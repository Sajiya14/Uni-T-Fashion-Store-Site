// src/AuthContext.js
import { createContext, useReducer } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case 'LOGOUT':
      localStorage.removeItem('user');

      return { 
        user: null 
      };

    default:
      return state;
  }
};


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch ] = useReducer(authReducer, {
    user: null
  })

  console.log('AuthContext state: ', state)

  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      { children }
    </AuthContext.Provider>
  )
};


