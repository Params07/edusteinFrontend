import React, { useMemo } from 'react';
import useBootCampData from '../DataComponents/BootCampData'; // Updated import
import Bootcamp from '../Components/Bootcamp';
import { IoClose } from "react-icons/io5";
import { showPopup } from '../../Components/Notification';
import usePost from '../Hooks/UsePost';
import useGet from '../Hooks/Get';

const Edit = ({ id, action }) => {
  console.log(id)
  const url = useMemo(() => `/bootcamps/bootcamp?id=${id}`, [id]); 

  const { data: bootcampData, loading, error } = useGet(url);
  const { post } = usePost('/bootcamps/updateBootcamp');

  const check = async (alteredData) => {
    
    if (bootcampData && bootcampData[0]) {
      
      alteredData.append('id', id);
      for (let pair of alteredData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      try {
        const result = await post(alteredData);
        showPopup({ success: true, message: 'Success update' });
        action(true);
        return true;
      } catch (error) {
        console.error('There was a problem with the axios request:', error);
        showPopup({ success: false, message: error.message });
        return false;
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center h-full">
      <div className="bg-white w-11/12 md:w-2/3 lg:w-1/2 p-4 rounded-lg h-5/6 overflow-y-auto">
        <span className="w-full flex justify-end">
          <IoClose onClick={() => { action(true); }} className="cursor-pointer text-4xl text-red-500" />
        </span>
        {bootcampData && bootcampData[0] && (
          <Bootcamp initialData={bootcampData[0]} action={check} />
        )}
      </div>
    </div>
  );
};

export default Edit;
