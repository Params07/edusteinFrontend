import React from 'react'
import { showPopup } from '../../Components/Notification';
import usePost from '../Hooks/UsePost';
const OpenRegistration = ({id,action}) => {
    const {post,error} = usePost('/bootcamps/openRegistration');
    const openregistration = async()=>{
     
      try{
         const result = await post({ id });
         showPopup({success:true,message:"Bootcamp data updated successfully!"})
         action(true);
      }catch(err){
         console.error(err);
         showPopup({success:false,message:error})
      }
    }
    return (
        <div className="fixed  inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center  ">
          <div className="bg-white w-max p-4 rounded-lg h-36 grid gap-6 ">
             <p className='font-semibold text-lg px-4'>Do you want to open registration  the for this  bootcamp?</p>
             <p className='w-full flex space-x-4'>
                <button className='w-full py-2 bg-red-500 border-2 border-red-500 hover:bg-red-400 text-white rounded-md' onClick={()=>openregistration()}>Yes</button>
                <button className='w-full py-2 bg-gray-300  rounded-md border-2 border-gray-300 hover:bg-gray-200 ' onClick={()=>{action(true)}}>No</button>
             </p>
        </div>
        </div>
      )
  
}

export default OpenRegistration