import { useEffect } from "react";
import { axiosPrivate } from "../api/axios"
import useRefresh from "./useRefresh";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";


const useAxiosPrivate = () => {
    const refresh = useRefresh();
    const {auth} = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers["Authorization"])
                    config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
                return config;
            },
            error => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error.response.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                if (error.response.status === 401) {
                    navigate("login");
                }
                Promise.reject(error)
            }
        );
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [refresh, auth])

    return axiosPrivate;
}

export default useAxiosPrivate;