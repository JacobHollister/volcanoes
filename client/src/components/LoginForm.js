import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import transition from "../utils/transition";
import { useAuth } from "../contexts/AuthContext";

import Loading from "./Loading";

export default function LoginForm ({close, isVisible}) {
    const navigate = useNavigate()
    const {error, loggedIn, login, message, setError, loading} = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formData

    useEffect(() => {
        if(loggedIn) {
            close()
            navigate('/volcanoes')
        }
    }, [loggedIn, close, navigate])

    const onChange = (e) => {
        setError(false)
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }))
    }

    const loginHandler = (e) => {
        e.preventDefault()
        login(formData)
    }

    const cancelHandler = (e) => {
        e.preventDefault()
        close()
    }

    const form = (
        <motion.form
        key="loginForm"            
        className="flex flex-col w-full px-20 max-w-lg"
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: transition()}}
        exit={{opacity: 0, transition: transition()}}>
            <div className="mb-6">
                <h3 className="font-serif text-3xl text-center mb-4">
                    Login
                </h3>
                <label 
                    className="block ml-1 mb-2 text-xl font-serif font-medium text-gray-900 dark:text-gray-300"
                    htmlFor="email">
                        Email
                </label>
                <input 
                    required
                    onChange={(e) => onChange(e)}
                    type="email" 
                    id="email" 
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
            </div>
            <div className="mb-6">
                <label 
                    className="block ml-1 mb-2 text-xl font-serif text-gray-900 dark:text-gray-300"
                    htmlFor="password">
                        Password
                    </label>
                <input 
                    required
                    onChange={(e) => onChange(e)}
                    type="password" 
                    id="password" 
                    value={password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    />
            </div>
            <div className="flex flex-row gap-10 px-1">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 font-medium text-white py-1 px-4 rounded h-8 flex-1"
                    onClick={(e) => loginHandler(e)}
                    >
                        Login
                </button>
                <button 
                    className="bg-slate-500 hover:bg-slate-400 font-medium text-white py-1 px-4 rounded h-8 flex-1"
                    onClick={(e) => cancelHandler(e)}
                    >
                        Cancel
                </button>
            </div>
            { loading &&  <Loading/>}
            
            {error && (
                <motion.div 
                key={message}
                className="bg-red-200 mt-5 p-1 rounded-sm"
                initial={{opacity: 0}}
                animate={{opacity: 1, transition: transition()}}
                exit={{opacity: 0, transition: transition()}}
                >
                    <p className="text-center text-lg">{message}</p>
                </motion.div>
                )}
            
        </motion.form>
    )

    return(
        <>
            {isVisible && form }
        </>
    )
}