import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const MyProfile = () => {
    const [me, setMe] = useState();
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const {auth} = useAuth()

    const handleClick = () => {
        navigate(from, { state: { from: location } })
    }

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getData = async () => {

            try {
                const response = await axiosPrivate("/get-me", {
                    // signal: controller
                });
                setMe(response?.data);
                
            } catch (error) {
                if (error.response.status == 401) {
                    navigate("/login", {state: {from: location, }, replace: true});
                }
                console.log(error);
            }
        }
        getData();

        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [auth])
    return (
        <div className="main">
            <h2>
                My Profile
            </h2>
            <div>
                {me && (
                    <>
                    <div>{`${me.firstname} ${me.lastname}`}</div>
                    <div>{me.username}</div>
                    </>
                )}
            </div>
            <button onClick={handleClick}>GO BACK</button>
        </div>
    )
}

export default MyProfile;