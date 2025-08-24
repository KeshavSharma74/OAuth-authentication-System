import React from 'react'
import { Route,Routes } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import Error from './components/Error'
import { GoogleOAuthProvider } from '@react-oauth/google'

const App = () => {

  const GoogleAuthWrapper = () =>{
    return (
      <GoogleOAuthProvider clientId='697891503715-dqpl262b0g7pggrnqb08cabtl7smb9gc.apps.googleusercontent.com' >
        <Login></Login>
      </GoogleOAuthProvider>
    )
  }

  return (
    <div>
      
      <Routes>
        <Route path='/login' element={<GoogleAuthWrapper></GoogleAuthWrapper>} ></Route>
        <Route path='/' element={<Navigate to='/login' ></Navigate>}></Route>
        
        <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
        <Route path='*' element={<Error></Error>}></Route>
      </Routes>

    </div>
  )
}

export default App