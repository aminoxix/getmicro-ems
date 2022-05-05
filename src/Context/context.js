import React, { createContext, useReducer, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { SET_USER, SET_LOADING } from "./actions.type";
import { reducer, initialState } from "./reducer";

export const appContext = createContext();

export default function AppContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  let authentication = getAuth();

  useEffect(() => {
    authentication.onAuthStateChanged((user) => {
      if (!user) {
        dispatch({
          type: SET_USER,
          payload: null,
        });
        dispatch({ type: SET_LOADING, payload: false });
      } else {
        dispatch({
          type: SET_USER,
          payload: { name: "Pratik Aswani", email: user.email },
        });
        dispatch({ type: SET_LOADING, payload: false });
      }
    });
  }, []);

  return (
    <appContext.Provider value={{ state, dispatch }}>
      {props.children}
    </appContext.Provider>
  );
}
