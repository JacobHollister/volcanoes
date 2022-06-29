import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";

import Loading from "./Loading";

import transition from "../utils/transition"

export default function RegisterForm ({close, isVisible}) {
    const navigate = useNavigate()
    const {error, loggedIn, register, message, setError, registerSuccess, loading} = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

    useEffect(() => {
        if(loggedIn) {
            close()
            navigate('/volcanoes')
        } else if(registerSuccess) {
            close()
            navigate('/login')
        }
    }, [loggedIn, close, navigate, registerSuccess])

    const registerHandler = (e) => {
        e.preventDefault()
        register(formData)
    }

    const cancelHandler = (e) => {
        e.preventDefault()
        close()
    }

    const onChange = (e) => {
        setError(false)
        setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: e.target.value,
        }))
    }

    const form = (
        <motion.form
        key="registerForm"            
        className="flex flex-col w-full px-20 max-w-lg"
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: transition()}}
        exit={{opacity: 0, transition: transition()}}>
            <div className="mb-6">
                <h3 className="font-serif text-3xl text-center mb-4">
                    Register
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
                    onClick={(e) => registerHandler(e)}
                    >
                        Register
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
            {isVisible && form}
        </>
    )
}