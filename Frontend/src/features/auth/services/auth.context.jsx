import { createContext, useState, useEffect, use } from "react";
import { getCurrentUser } from "./auth.api";


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data.user);
            }
            catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        }
        fetchCurrentUser();
    }, []);
    
    return (
        <AuthContext.Provider value = {{ user, setUser, loading, setLoading }}>
            {children}
        </AuthContext.Provider>
    )
}