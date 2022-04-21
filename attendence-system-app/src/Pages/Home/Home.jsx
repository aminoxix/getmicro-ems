import React, {useContext, useEffect} from 'react';

import { appContext } from '../../Context/context';
import { getAuth } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard"


export default function Home() {
    const { state, dispatch } = useContext(appContext);
    const auth = getAuth();
    let navigate = useNavigate();


    useEffect(() => {
        document.title = "Dashboard";
    }, []);


    // const handleLogout = async() => {
    //     await auth.signOut();
    // }

    return (
        <div>
            <AdminDashboard />
        </div>
    )
}
