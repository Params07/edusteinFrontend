import React, { useEffect, useState,useCallback,useMemo, Suspense } from 'react';
import DropDownMenu from '../../Components/DropDownMenu';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { loadComponent } from '../../Components/DynamicImport';
import useGet from '../Hooks/Get';
import DynamicTable from '../Components/DynamicTable';

const MyBootCamp = () => {
  const baseActions = ['Edit', 'Delete', 'View'];
  const [currentComponent, setCurrentComponent] = useState(null);
  const [currentId, setCurrentId] = useState(null);
  
  const url = '/bootcamps/bootcamp?id=0'
  const { data: bootcampData = [], fetchData } = useGet(url); 
  
  const [registrationStatusMap, setRegistrationStatusMap] = useState({});

  useEffect(() => {
    fetchData(); 
  }, [fetchData]);

  useEffect(() => {
    const statusMap = bootcampData.reduce((map, bootcamp) => {
      map[bootcamp.id] = bootcamp.registration_status;
      return map;
    }, {});
    setRegistrationStatusMap(statusMap);
  }, [bootcampData]);

  const handleOptionClick = useCallback((option, id) => {
    setCurrentId(id);
    const Component = loadComponent(option);
    if (Component) {
      setCurrentComponent(() => <Component id={id} action={(result) => {
        setCurrentComponent(null); 
        fetchData(); 
      }} />);
    }
  }, []);

  const renderDropdown = (row) => {
    const originalStatus = registrationStatusMap[row.id];
    const registrationAction = originalStatus ? 'CloseRegistration' : 'OpenRegistration';
    const actions = [...baseActions, registrationAction];

    return (
      <DropDownMenu
        value={<BsThreeDotsVertical />}
        options={actions}
        onOptionClick={handleOptionClick}
        id={row.id}
      />
    );
  };

  const processedBootcampData = useMemo(() => 
    bootcampData.map((bootcamp) => ({
      ...bootcamp,
      registration_status: (
        <span
          className={`px-2 py-1 text-white rounded ${
            bootcamp.registration_status ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {bootcamp.registration_status ? 'Open' : 'Closed'}
        </span>
      ),
    })), [bootcampData]);

  return (
    <div className=''>
      <div className='w-full flex items-center justify-between shadow-md py-6 px-4 h-24 mb-6'>
        <p className='text-xl font-semibold'>My BootCamps</p>
      </div>

      <div>
        <DynamicTable
          data={processedBootcampData} 
          component={renderDropdown}
          action={'Action'}
        />
      </div>
      {currentComponent && (
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {currentComponent}
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default MyBootCamp;
