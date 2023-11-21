import axios from "../api/axios"
import useAuth from "./useAuth";

const useRefresh = () => {
    const { auth, setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            withCredentials: true
        });
        const accessToken = response.data.accessToken
        setAuth({ ...auth, accessToken });
        return accessToken;
    }

    return refresh;
}

export default useRefresh;