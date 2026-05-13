import { useContext, useEffect } from "react";
import { AuthContext } from "../services/auth.context";
import { registerUser, loginUser, logoutUser, getCurrentUser } from "../services/auth.api";



export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, setUser, loading, setLoading } = context;


    const handleLogin = async (email, password) => {
        setLoading(true);

        try {
            const data = await loginUser(email, password);
            setUser(data.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleRegister = async ({username, email, password}) => {
        setLoading(true);

        try {
            const data = await registerUser({username, email, password});
            setUser(data.user);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    const handleLogout = async () => {
        setLoading(true);
        try {
            const data = await logoutUser();
            setUser(null);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const data = await getCurrentUser();
                setUser(data?.user ?? null);
            }
            catch (err) {
                console.log(err);
                setUser(null);
            } finally {
                setLoading(false);
            }
        }
        fetchCurrentUser();
    }, []);

    return { user, loading, handleLogin, handleRegister, handleLogout };
}