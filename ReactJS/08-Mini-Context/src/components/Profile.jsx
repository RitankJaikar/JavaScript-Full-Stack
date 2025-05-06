import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Profile() {
    const {user} = useContext(UserContext);
    console.log(user);

    if(!user || !user.username) return <div>Please Login</div>

    return <div>Welcome {user.username}</div>
}