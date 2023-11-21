import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";
import { useCookies } from "react-cookie";


const Navbar = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await axios.delete("/logout", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${auth?.accessToken}`
            }
        });
        setAuth({ isLoggedIn: false });
        localStorage.setItem("isLoggedIn", false);
    }


    return (
        <nav>
            <h1 className="title">
                Site
            </h1>
            <ul className="nav-list">
                <li>
                    {auth.isLoggedIn ? (
                        <button className="logout-button" onClick={handleLogout}>logout</button>
                    ) :
                        (
                            <button onClick={() => { navigate("login") }}>login</button>
                        )
                    }
                </li>
            </ul>
        </nav>
    )
}

export default Navbar;