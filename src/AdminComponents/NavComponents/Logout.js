import React, { useEffect } from 'react'
import { useAuth } from '../../AuthContext'
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const {logout} = useAuth();
  const navigate = useNavigate(); 
  useEffect(()=>{
     const logOut = async()=>{
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, {
          method: 'POST',
         
          credentials: 'include', 
        });
  
        if (response.ok) {
          logout();
          navigate('/Login');
        } else {
          
        }
      } catch (error) {
        console.error('Login failed:', error);
        alert('An error occurred. Please try again.');
      }
     }
     logOut();
  },[])
  return (
    <div>Logout</div>
  )
}

export default Logout