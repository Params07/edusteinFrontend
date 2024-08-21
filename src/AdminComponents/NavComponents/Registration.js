import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import EmailDrafter from '../Components/EmailDrafter';
import {  showPopup } from '../../Components/Notification';
import RegistrationData from '../DataComponents/RegistrationData';
import DynamicTable from '../Components/DynamicTable';
import axios from 'axios';
import useGet from '../Hooks/Get';
import useCreateExcelFile from '../Components/CreateExcelFile';

const Registration = () => {
  const [options, setOptions] = useState([]);
  const [bootcamp, setBootCamp] = useState(null);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedEmail,setSelectedEmails] = useState([])
  const [showEmailDrafter, setShowEmailDrafter] = useState(false);
  const {downloadExcelFile,downloading} = useCreateExcelFile('registration_data');

  const url = `${process.env.REACT_APP_BACKEND_URL}/bootcamps/bootcamp?id=0`
  const { data: bootcampData = [], fetchData } = useGet(url); 
  
  useEffect(() => {
    if (bootcampData) {
      const formattedOptions = bootcampData.map((i) => ({
        label: i.title,
        value: i.id,
      }));
      setOptions(formattedOptions);
      if (!bootcamp && formattedOptions.length > 0) {
        setBootCamp(formattedOptions[0]);
      }
    }
  }, [bootcampData]);

  const registrationsData = RegistrationData({ bootcampId: bootcamp ? bootcamp.value : 0 });

  useEffect(() => {
    if (selectAll && registrationsData) {
      const ids = registrationsData.map((content) => content.id);
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  }, [selectAll, registrationsData]);

  const handleCheckboxChange = (id) => {
    setSelectedIds((prevSelectedIds) =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter((selectedId) => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
  };
  const InitiateEmailDrater=()=>{
    const emails = registrationsData
    .filter((content) => selectedIds.includes(content.id))
    .map((content) => content.email);
    setSelectedEmails(emails)
    setShowEmailDrafter(true)
  }
  const CreateExcelFile = async()=>{
    
    const tempExcelData = registrationsData.filter((content)=>selectedIds.includes(content.id)).map((content)=>content)
   downloadExcelFile(tempExcelData)
   
  }
  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between shadow-md py-6 px-4 h-24 mb-6'>
        <p className='text-xl font-bold'>Registrations Data</p>
        <Select
          className="w-64"
          name="bootcamp"
          value={bootcamp}
          options={options}
          required
          placeholder="Bootcamp Name"
          onChange={(selectedOption) => setBootCamp(selectedOption)}
        />
        <input
          tabIndex={-1}
          autoComplete="off"
          style={{ opacity: 0, height: 0, position: "absolute" }}
          value={bootcamp ? bootcamp.value : ''}
          onChange={() => {}}
          required
        />
      </div>
      <div className='pl-5 pb-3'>
        {selectedIds.length !== 0 && (
          <div className='flex space-x-4'>
            <button className='bg-black px-5 py-2 text-white rounded-md' onClick={() => {InitiateEmailDrater()}}>
            Send Mail
          </button>
          <button disabled={downloading} className='bg-black px-5 py-2 text-white rounded-md' onClick={() => {CreateExcelFile()}}>
          {downloading?'Downloading':'Download'}
        </button>
            </div>
        )}
      </div>
     {
      registrationsData &&  <DynamicTable
      data={registrationsData}
      component={(row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.id)}
          onChange={() => handleCheckboxChange(row.id)}
        />
      )}
      action={
        <input
          type="checkbox"
          checked={selectAll}
          onChange={handleSelectAllChange}
        />
      }
    />
   
     }
      {showEmailDrafter && (
        <EmailDrafter
          emails={selectedEmail}
          onClose={() => setShowEmailDrafter(false)}
          showPopup={showPopup}
        />
      )}
    </div>
  );
};

export default Registration;
