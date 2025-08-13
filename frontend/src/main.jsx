import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx'
import ProjectRoute from './Routes.jsx';
import { BrowserRouter, BrowserRouter as Router } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <AuthProvider>
     <Router>
           <ProjectRoute/>
     </Router>
  </AuthProvider>,
)
