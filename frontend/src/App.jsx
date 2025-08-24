import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <Login />
      </GoogleOAuthProvider>
    )
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<GoogleAuthWrapper />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  )
}

export default App
