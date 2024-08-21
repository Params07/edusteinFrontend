import React, { useEffect, useState, useMemo } from 'react';
import Select from 'react-select';
import useGet from '../Hooks/Get';
import useBootCampData from '../DataComponents/BootCampData';
import DynamicTable from '../Components/DynamicTable';
import useCreateExcelFile from '../Components/CreateExcelFile';
const Transaction = () => {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [options, setOptions] = useState([]);
  const [bootcampOption, setBootCampoption] = useState(null);
  const [url, setUrl] = useState('');
  const {downloadExcelFile,downloading} = useCreateExcelFile('transactiondata');
  const transactionStatusOptions = [
    { label: 'Completed', value: 'completed' },
    { label: 'Refund', value: 'refund' },
  ];

  const { data:bootcampData } = useGet(`${process.env.REACT_APP_BACKEND_URL}bootcamps/bootcamp?id=0`);
  const [currentStatus, setCurrentStatus] = useState(transactionStatusOptions[0]);

  const formattedOptions = useMemo(() => {
    if (!bootcampData) return [];
    const options = bootcampData.map(i => ({
      label: i.title,
      value: i.id,
    }));
    options.unshift({ label: 'All', value: 'all' });
    return options;
  }, [bootcampData]);

  useEffect(() => {
    setOptions(formattedOptions);
    setBootCampoption(formattedOptions[0]);
  }, [formattedOptions]);

  
  const memoizedUrl = useMemo(() => {
    return `${process.env.REACT_APP_BACKEND_URL}/transaction/${currentStatus.value}${currentStatus.value !== 'refund' ? `?bootcamp_id=${bootcampOption?.value || 'all'}` : ''}`;
  }, [currentStatus, bootcampOption]);

  
  useEffect(() => {
    if (memoizedUrl !== url) {
      setUrl(memoizedUrl);
    }
  }, [memoizedUrl, url]);

  const { fetchData, data } = useGet(url);



  useEffect(() => {
    if (selectAll && data) {
      const ids = data.map(content => content.id);
      setSelectedIds(ids);
    } else {
      setSelectedIds([]);
    }
  }, [selectAll, data]);

  const handleCheckboxChange = (id) => {
    setSelectedIds(prevSelectedIds =>
      prevSelectedIds.includes(id)
        ? prevSelectedIds.filter(selectedId => selectedId !== id)
        : [...prevSelectedIds, id]
    );
  };

  const handleSelectAllChange = () => {
    setSelectAll(prevSelectAll => !prevSelectAll);
  };
  const handleExcel = () =>{
    const tempExcelData = data.filter((content)=>selectedIds.includes(content.id)).map((content)=>content)
   
    downloadExcelFile(tempExcelData);

  }
  
  return (
    <div className='w-full'>
      <div className='w-full flex items-center justify-between shadow-md py-6 px-4 h-24 mb-6'>
        <p className='text-xl font-bold'>Transaction Data</p>
        <div className='flex space-x-4'>
          <Select
            className='w-64'
            name='transactionStatus'
            value={currentStatus}
            options={transactionStatusOptions}
            required
            placeholder='Select Status'
            onChange={selectedOption => setCurrentStatus(selectedOption)}
          />
          <Select
            className='w-64'
            name='bootcamp'
            value={bootcampOption}
            options={options}
            required
            isDisabled={currentStatus.value === 'refund'}
            placeholder='Bootcamp Option'
            onChange={selectedOption => setBootCampoption(selectedOption)}
          />
        </div>
      </div>
      <div className='pl-5 pb-3'>
        {selectedIds.length !== 0 && (
          <div className='flex space-x-4'>
           <button className='py-2 text-white bg-black px-5 rounded-xl' onClick={()=>{handleExcel();}}>Download</button>
          </div>
        )}
      </div>
      <DynamicTable
        data={data}
        component={row => (
          <input
            type='checkbox'
            checked={selectedIds.includes(row.id)}
            onChange={() => handleCheckboxChange(row.id)}
          />
        )}
        action={
          <input
            type='checkbox'
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
        }
      />
    </div>
  );
};

export default Transaction;
