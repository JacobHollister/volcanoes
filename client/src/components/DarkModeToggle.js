import { motion } from "framer-motion"

import { useTheme } from "../contexts/ThemeContext"

import { FaSun, FaMoon } from "react-icons/fa"

export default function DarkModeToggle () {

    const { darkMode, toggleTheme } = useTheme()

    const sliderVarients = {
        light: { left: '0px', right: 'auto'},
        dark: { left: "auto", right: "0px"}
    }

    return (
        <div onClick={() => toggleTheme()} className='transition fixed bottom-10 right-10 h-12 w-24 bg-blue-100 border-2 border-slate-900 dark:border-white dark:bg-slate-700 rounded-full overflow-hidden'>
            <div className='w-full h-full relative flex justify-between'>
            <div className="z-10 w-16">
                <FaSun className='w-full h-full p-3 text-white transition-all'/>
            </div>
            <div className="z-10 w-16">
                <FaMoon className='w-full h-full p-3 dark:text-white transition-all'/>
            </div>
            <motion.div 
                className='absolute top-0 bottom-0 w-12 rounded-full bg-blue-500'
                variants={sliderVarients}
                animate={darkMode ? "dark" : "light"}
                ></motion.div>
            </div>
        </div>
    )
}