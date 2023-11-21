import React, { useState } from 'react';
import Toaster from '../components/Toaster';
import { useLocation } from 'react-router-dom';
import { useNavigate  } from 'react-router-dom';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

const Login = () => {
    const {auth, setAuth} = useAuth()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [toastType, setToastType] = useState("info");
    const location = useLocation();

    const navigateTo = location.state?.from || "/";
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const data = { username, password }
            const response = await axios.post(`/login`, data, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            
            if (response.status !== 200)
                throw new Error(response.data.message);
            setAuth({isLoggedIn: true});
            localStorage.setItem("isLoggedIn", true);
            navigate(navigateTo);

        } catch (error) {
            setToastType("error");
            setErrorMessage(error.response?.data?.message);
            setShowToast(true);
            setTimeout(() => {
                setShowToast(false);
            }, 3000);
        } finally {
            setPassword('');
        }
    };

    return (
        <div className='main'>

        <form onSubmit={handleSubmit}>

            <h2>Login to Your Account</h2>

            <input
                placeholder='username'
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                placeholder='password'
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />

            {showToast && <Toaster message={errorMessage} type={toastType} />}

            <button type="submit">Login</button>
        </form>
        </div>
    );
};

export default Login;