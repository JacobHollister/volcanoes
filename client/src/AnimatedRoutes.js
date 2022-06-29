import { Routes, Route, useLocation } from 'react-router-dom'

import Volcanoes from './pages/Volcanoes';
import Volcano from './pages/Volcano';
import Home from './pages/Home';

import { AnimatePresence } from "framer-motion"

export default function AnimatedRoutes() {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={ <Home />}/>
                <Route path='/login' element={ <Home />}/>
                <Route path='/register' element={ <Home />}/>
                <Route path='/volcanoes' element={ <Volcanoes />}/>
                <Route path='/volcano/:id' element={ <Volcano />}/>
            </Routes>
        </AnimatePresence>
    )
}
