import React, { useEffect, useReducer } from "react";
import "./App.css";
import PageRoutes from "./Routes/pageRoutes";
import { getAuth } from "firebase/auth";
import { appContext } from "./Context/context";
import { SET_USER } from "./Context/actions.type";
import { reducer, initialState } from "./Context/reducer";
import { db } from "./Config/firebase-config";
import { useNavigate } from "react-router-dom";
import Copyright from "./Components/Footer/Copyright";

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  let authentication = getAuth();
  let navigate = useNavigate();

  // setting db settings
  db.settings({ timestampsInSnapshots: true });

  useEffect(() => {
    authentication.onAuthStateChanged((user) => {
      if (!user) {
        dispatch({
          type: SET_USER,
          payload: null,
        });
        navigate("/");
      } else {
        dispatch({
          type: SET_USER,
          payload: { name: "Pratik Aswani", email: user.email },
        });
      }
    });
  }, []);
  return (
    <div className="App">
      <appContext.Provider value={{ state, dispatch }}>
        <PageRoutes />
        <Copyright />
      </appContext.Provider>
    </div>
  );
}

export default App;
