import { BrowserRouter as Router} from 'react-router-dom'

import AnimatedRoutes from './AnimatedRoutes';
import Navbar from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'

// testing in development
import axios from 'axios'
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    axios.defaults.baseURL = 'http://localhost:5000';
}


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Navbar/>
          <AnimatedRoutes />
        </Router>
        <DarkModeToggle/> 
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
