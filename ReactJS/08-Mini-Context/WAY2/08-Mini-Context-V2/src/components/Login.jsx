import { useState } from "react"
import useUser from "../context/UserContext";
import { useContext } from "react";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const {setUser} = useUser();

    function handleOnClick(e) {
        setUser({username, password});
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            <br /><br />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <br /><br />
            <button onClick={handleOnClick}>Login</button>
        </div>
    )
}