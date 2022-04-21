import React, {useEffect} from 'react';

export default function Home() {
    useEffect(() => {
        document.title = "Dashboard";
    }, []);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}
