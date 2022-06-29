import { createContext, useContext, useState } from "react";
import axios from "axios"

const token = JSON.parse(localStorage.getItem('token'))

const initialState = {
            loading: false,
            loggedIn: token ? true: false,
            registerSuccess: false,
            error: false,
            message: "null",
            token: token ? token.token : null
        }

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [authState, setAuthState] = useState( initialState )

    const setRegisterSuccess = (success) => {
        setAuthState(prev => {
            return {...prev, registerSuccess: success}
        })
    }

    const setLoading = (loading) => {
        setAuthState(prev => {
            return {...prev, loading}
        })
    }

    const setLoggedIn = (loggedIn) => {
        setAuthState(prev => {
            return {...prev, loggedIn}
        })
    }

    const setError = (error) => {
        setAuthState(prev => {
            return {...prev, error}
        })
    }

    const setMessage = (message) => {
        setAuthState(prev => {
            return {...prev, message}
        })
    }

    const setToken = (token) => {
        setAuthState(prev => {
            return {...prev, token}
        })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setLoggedIn(false)
        setLoading(false)
        setToken(null)
    }


    const register = (formData) => {
        const url = "http://sefdb02.qut.edu.au:3001/user/register"

        const config = {
            url,
            method: 'post', 
            data: formData
        }

        setLoading(true)
        axios({...config, timeout: 10000})
                .then((result) => {
                    setRegisterSuccess(true)
                })
                .catch((e) => {
                    setError(true);
                    setMessage(e.response ? e.response.data.message : e.message);
                })
                .finally(() => {
                        setLoading(false);
                });
    }

    const login = (formData) => {
        const url = "http://sefdb02.qut.edu.au:3001/user/login"

        const config = {
            url,
            method: 'post', 
            data: formData
        }

        setLoading(true)
        axios({...config, timeout: 10000})
                .then((result) => {
                    localStorage.setItem('token', JSON.stringify(result.data))
                    setToken(result.data.token)
                    setLoggedIn(true)
                })
                .catch((e) => {
                    setError(true);
                    setMessage(e.response ? e.response.data.message : e.message);
                })
                .finally(() => {
                        setLoading(false);
                });
    }

    return (
        <AuthContext.Provider value={{...authState, login, register, logout, setError }}>
            {children}
        </AuthContext.Provider>

    )
}