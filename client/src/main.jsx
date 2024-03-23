import React from 'react'
import ReactDOM from 'react-dom/client'
import Route from './Route.jsx'
import './index.css'
import { AuthProvider } from './contexts/AuthContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <Route />
    </AuthProvider>
  </React.StrictMode>,
)
