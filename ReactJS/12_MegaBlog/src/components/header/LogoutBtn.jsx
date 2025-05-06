import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import { useNavigate } from "react-router-dom";
import { managePosts } from "../../store/postSlice";


export default function LogoutBtn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const logoutHandler = () => {
        authService.logout()
            .then(() => {
                dispatch(logout());
                dispatch(managePosts([]));
                navigate("/login"); // Redirect to login page after logout
            })
            .catch(err => {
                console.log(err.message);
            })
    }

    return (
        <button className="inline-block px-6 py-2 rounded-full bg-gradient-to-r from-gray-700 via-gray-700 to-gray-700 text-white font-semibold transition duration-300 hover:from-purple-700 hover:via-pink-600 hover:to-red-600 hover:shadow-lg" onClick={logoutHandler}>Logout</button>
    )
}