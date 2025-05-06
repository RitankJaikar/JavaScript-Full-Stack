import Header from "./components/Header/header"
import Footer from "./components/Footer/Footer"
import Home from "./components/Home/Home"
import { Outlet } from "react-router-dom"

export default function Root() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}