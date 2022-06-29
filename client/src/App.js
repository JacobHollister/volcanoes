import { BrowserRouter as Router} from 'react-router-dom'

import AnimatedRoutes from './AnimatedRoutes';
import Navbar from './components/Navbar';
import DarkModeToggle from './components/DarkModeToggle';

import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'



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
