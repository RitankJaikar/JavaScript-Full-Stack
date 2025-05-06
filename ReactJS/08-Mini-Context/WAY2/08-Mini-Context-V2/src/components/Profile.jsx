import { useContext } from "react";
import useUser from "../context/UserContext";

export default function Profile() {
    const {user} = useUser();
    console.log(user);
    if(!user || !user.username)  return <div>Login Again</div>
    return <div>Hello! {user.username}</div>
}