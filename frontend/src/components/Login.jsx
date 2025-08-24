import React from 'react'
import { FcGoogle } from 'react-icons/fc'   // ✅ correct import
import { useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'

const Login = () => {

  const responseGoogle = async(authResult)=>{
      try{
        console.log(authResult);
        const response= await axios.get(`http://localhost:3000/google?code=${responseGoogle.code}`);
        if(response.data.success){
          console.log("Loggedin successfully");
        }
      }
      catch(error){
        console.log(`Error while requesting google code : ${error}`);
      }
  }

  const googleLogin = useGoogleLogin({
      onSuccess:responseGoogle,
      onError:responseGoogle,
      flow:'auth-code'
  })

  return (
    <div className='flex justify-center items-center h-screen'>
      <button onClick={googleLogin} className='flex hover:cursor-pointer items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg font-bold hover:bg-gray-100'>
        <FcGoogle size={24} />  
        Sign in with Google
      </button>
    </div>
  )
}

export default Login
