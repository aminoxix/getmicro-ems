import React, {useContext, useEffect} from 'react';

import { appContext } from '../../Context/context';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
//import { LOGOUT_USER } from '../../Context/actions.type';

export default function Home() {
    const { state, dispatch } = useContext(appContext);
    const auth = getAuth();
    let navigate = useNavigate();


    useEffect(() => {
        if (!state.user) {
            navigate('/');
        }
        document.title = "Dashboard";
    }, []);


    const handleLogout = async() => {
        await auth.signOut();
    }


    

    return (
        <div>
            <h1>Dashboard</h1>
            <h2>Hey { state.user ? state.user.name: "User Logged out"}</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}
