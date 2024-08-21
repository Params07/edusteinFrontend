
import Bootcamp from '../Components/Bootcamp';
import {showPopup } from '../../Components/Notification';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import usePost from '../../Hooks/UsePost';
import { useState } from 'react';

const AddBootcamp = () => {
    
   let data = {};
   const { post, loading, error } = usePost('/bootcamps/addBootcamp');

   const addBootCamp = async (formData) => {
     try {
       const result = await post(formData);
       showPopup({ success: true, message: 'Success uploaded' });
       return true
     } catch (error) {
       console.error('There was a problem with the axios request:', error);
       showPopup({ success: false, message: 'Upload failed' });
       return false
     }
   };
  return (
   
    <Bootcamp data={data} action={addBootCamp}/>
    
   
 
   
  );
};
 
export default AddBootcamp;
