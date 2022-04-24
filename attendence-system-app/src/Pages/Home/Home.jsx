import React, {useContext, useEffect} from 'react';
import AdminDashboard from "../Dashboard/AdminDashboard/AdminDashboard"

export default function Home() {
    
    
    useEffect(() => {
        document.title = "Dashboard";
    }, []);


    return (
        <div>
            <AdminDashboard />
        </div>
    )
}
