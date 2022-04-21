import React, {useContext, useEffect} from 'react';

import { appContext } from '../../Context/context';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';


export default function Home() {
    const { state, dispatch } = useContext(appContext);
    const auth = getAuth();
    let navigate = useNavigate();


    useEffect(() => {
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
