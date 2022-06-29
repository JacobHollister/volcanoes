import { createContext, useContext, useState } from "react";

const ThemeContext = createContext()

export function useTheme() {
    return useContext(ThemeContext)
}

export function ThemeProvider({children}) {
    const [darkMode, setDarkMode] = useState( false )

    const toggleTheme = ()=>{
        setDarkMode(prev =>!prev);
        const root = window.document.documentElement; 
        root.classList.toggle('dark');
    }


    return (
        <ThemeContext.Provider value={{darkMode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>

    )
}