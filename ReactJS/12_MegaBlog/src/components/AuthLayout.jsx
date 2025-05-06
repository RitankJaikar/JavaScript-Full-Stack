import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'



export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loader, setLoader] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && authStatus != authentication) {    //user is not logged in, forward to login page
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {   //user is logged in, forward to home page. for sign and signup pages.
            navigate("/");
        }
        setLoader(false);
    }, [authStatus, navigate, authentication])

    return loader ? <h1>Loading...</h1> : <>{children}</>
}