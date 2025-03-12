import {createContext, PropsWithChildren, useContext, useLayoutEffect, useState} from "react";
import {client} from "@/api/private-client.ts";

export type user = {
    userId: number;
    username: string;
    userRole: string;
    userEmail: string;
    access_token: string;
}

type AuthContext = {
    user: user | null;
    handleLogin: (email:string, password: string) => Promise<boolean>;
    handleLogout: () => Promise<void>;
    loading: boolean;
};

type AuthProviderProps = PropsWithChildren;

const AuthContext = createContext<AuthContext | undefined>(undefined);

export default function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<user | null>(null);
    const [loading, setLoading] = useState(true);


    async function refreshToken() {
        try {
            console.log("refreshing token");
            setLoading(true);
            const response = await client.post("auth/refresh", {}, { withCredentials: true });
            if (response?.status === 200) {
                setUser(response.data);
                client.defaults.headers.common.Authorization = "Bearer " + response.data.access_token;
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }


    useLayoutEffect(() => {

        refreshToken();

        const refreshInterceptor = client.interceptors.response.use(
            response => response,
            async error => {
                const originalRequest = error.config;

                if (error.response?.status === 401) {
                    try {
                        const response = await client.post("auth/refresh", {}, { withCredentials: true });
                        client.defaults.headers.common.Authorization = "Bearer " + response.data.access_token;
                        originalRequest.headers.Authorization = "Bearer " + response.data.access_token;
                        originalRequest._retry = true;
                        return client(originalRequest);
                    }  catch {
                        setUser(null);
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            client.interceptors.response.eject(refreshInterceptor);
        }
    }, []);


    async function handleLogin(
        email: string,
        password: string
    ): Promise<boolean> {
        try {
            try {
                const response = await client.post("auth/login", {
                    email: email,
                    password: password
                }, { withCredentials: true });

                if (response?.status === 200) {
                    setUser(response.data);
                    client.defaults.headers.common.Authorization = "Bearer " + response.data.access_token;
                    return true;
                }
                return false;
            } catch {
                setUser(null);
                return false;
            }
        } catch {
            setUser(null)
            return false;
        }
    }

    async function handleLogout() {
        client.defaults.headers.common.Authorization = "";
        setUser(null);
    }

    return(
    <AuthContext.Provider value={{user, handleLogin, handleLogout, loading}}>
        {children}
    </AuthContext.Provider>
    );
}


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}