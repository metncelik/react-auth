import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const navigate = useNavigate();
    const location = useLocation();
    return (
        <div className="main">
            <h2>
                HOME
            </h2>
            <button onClick={() => navigate("/my-profile", { state: { from: location } })}>GO TO PROFILE</button>
        </div>
    )
}

export default Home;