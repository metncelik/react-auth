import { createContext, useEffect, useState } from "react";

const AuthContext = createContext("");

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({"isLoggedIn": localStorage.getItem("isLoggedIn") === "true" ? true : false});

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
} 

export default AuthContext;