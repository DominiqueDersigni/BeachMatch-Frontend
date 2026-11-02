import {createContext, useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";

export const AuthContext = createContext({});

export function AuthProvider({children}) {
    const [authState, setAuthState] = useState({
        isAuth: false,
        user: null,
        status: 'pending',
    })
    const navigate = useNavigate();


    useEffect(() => {
        setAuthState({ ...authState, status: 'done' });
    }, []);

    function login(token) {
        localStorage.setItem('token', token);
        const decodedToken = jwtDecode(token);

        setAuthState({
            isAuth: true,
            user: {
                username: decodedToken.preferred_username,
                email: decodedToken.email,
                roles: decodedToken.resource_access.BeachMatchBackend.roles,
            },
            status: 'done',
        });
        console.log("Gebruiker is ingelogd!")
        navigate('/profile')
    }


    function logout() {
        localStorage.removeItem('token');
        setAuthState({
            isAuth: false,
            user: null,
            status: 'done',
        });
        console.log("Gebruiker is uitgelogd!")
        navigate('/')
    }

    const data = {
        ...authState,
        login: login,
        logout: logout,
    };

    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children}
        </AuthContext.Provider>
    )
}