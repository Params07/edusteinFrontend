import React, { useState, useEffect, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import useGet from '../Hooks/Get';
import MyChart from '../Components/MyChart';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import  Select  from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { TbMoneybag } from "react-icons/tb";
import { FaUserFriends } from "react-icons/fa";
import MyPieChart from '../Components/MyPieChart';
dayjs.extend(utc);



const theme = createTheme();

const Dashboard = () => {
  const [earningsdata,setEarningsdata] = useState(0);
  const [bootcamps,setBootcamp] = useState([]);
  const [options,setOptions] = useState({});
  const [bootcampoption,setBootCampoption] = useState([]);
  const { data:bootcampData } = useGet('/bootcamps/bootcamp?id=0');
  const [chartData,setChartData] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [filterOption,setFilterOption] = useState();
  const filters = [{
      label:'Today',value:'Today'
  },{
    label:'Last week',value:'Last week'
},{
  label:'custom',value:'custom'
}]
useEffect(()=>{
 setFilterOption(filters[0])
},[])
useEffect(() => {
  const currentDate = dayjs().utc().toDate();

  if (filterOption?.value === 'Today') {
    setStartDate(currentDate);
    setEndDate(currentDate);
  } else if (filterOption?.value === 'Last week') {
    setEndDate(currentDate);
    setStartDate(dayjs().utc().subtract(7, 'days').toDate());
  } else if (filterOption?.value === 'Custom') {
    setStartDate(dayjs().utc().startOf('month').subtract(3, 'months').toDate());
    setEndDate(dayjs().utc().endOf('month').toDate());
  }

}, [filterOption]);


  useEffect(() => {
    if (bootcampData) {
      const formattedOptions = bootcampData.map(i => ({
        label: i.title,
        value: i.id,
      }));
      formattedOptions.unshift({ label: 'All', value: 'all' });
      setOptions(formattedOptions);
      setBootCampoption(formattedOptions[0]);
    }
  }, [bootcampData]);
  
 
  const { ChartDatasurl, registrationUrl, Piechartdataurl } = useMemo(() => {
    if (bootcampoption.value === undefined || startDate === undefined || endDate === undefined) {
      return { ChartDatasurl: null, registrationUrl: null, Piechartdataurl: null };
    }
  
    const chartDataUrl = `/dashboard/chartData?id=${bootcampoption.value === 'all' ? 'all' : bootcampoption.value}&start_date=${dayjs(startDate).utc().format('YYYY-MM-DD')}&end_date=${dayjs(endDate).utc().format('YYYY-MM-DD')}`;
    const registrationUrl = `/dashboard/registration?id=${bootcampoption.value === 'all' ? 'all' : bootcampoption.value}&start_date=${dayjs(startDate).utc().format('YYYY-MM-DD')}&end_date=${dayjs(endDate).utc().format('YYYY-MM-DD')}`;
    const Piechartdataurl = `/dashboard/piechartdata?start_date=${dayjs(startDate).utc().format('YYYY-MM-DD')}&end_date=${dayjs(endDate).utc().format('YYYY-MM-DD')}`;
    
    return { ChartDatasurl: chartDataUrl, registrationUrl, Piechartdataurl };
  }, [bootcampoption, startDate, endDate]);
  
  console.log(ChartDatasurl)

  const {data:registrationCount = [{tot:0}]} = useGet(registrationUrl);
  const {data:chart} = useGet(ChartDatasurl);
  const {data:piechartdata} = useGet(Piechartdataurl)
  


  useEffect(() => {
    if (chart) {
      const tot = chart.reduce((acc,item) => Number(acc)+Number(item.total_amount),0);
      setEarningsdata(tot)
      setChartData(chart);
    }
  }, [chart]);
  
  const handleStartDateChange = (date) => {
    if (date && dayjs(date).isValid() && !dayjs(date).utc().isBefore(dayjs(endDate).utc().subtract(6, 'months'))) {
      setStartDate(dayjs(date).utc().startOf('month').toDate());
    } else {
      setStartDate(startDate);
    }
  };
  
  const handleEndDateChange = (date) => {
    if (date && dayjs(date).isValid() && dayjs(date).utc().isBefore(dayjs().utc().endOf('month'))) {
      setEndDate(dayjs(date).utc().endOf('month').toDate());
      if (dayjs(date).utc().diff(dayjs(startDate).utc(), 'month') > 6) {
        setStartDate(dayjs(date).utc().startOf('month').subtract(6, 'months').toDate());
      }
    } else {
      setEndDate(endDate);
    }
  };
  
  
 


  return (
    <ThemeProvider theme={theme}>
      <div className="flex flex-col ">
        <div className="w-full h-16 flex justify-center items-center shadow-md ">
          <p className="font-bold">Dashboard</p>
        </div>
        <div className="h-screen p-4 bg-gray-200">
           <div className='flex space-x-4 w-full '>
           <Select
            className='w-64'
            name='transactionStatus'
            value={bootcampoption}
            options={options}
            required
            placeholder='Select Status'
            onChange={selectedOption => setBootCampoption(selectedOption)}
          />
           <Select
            className='w-64'
            name='options'
            value={filterOption}
            options={filters}
            required
            placeholder='Select option'
            onChange={selectedOption => setFilterOption(selectedOption)}
          />
       { filterOption && filterOption.value === 'custom' ?
        <div className='flex space-x-8'>
           <DatePicker
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selectsStart
              startDate={startDate}
              endDate={endDate}
              maxDate={dayjs(endDate).subtract(1, 'month').endOf('month').toDate()}
              placeholderText="Start Date"
              className="mr-4"
            />
            <DatePicker
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="MM/yyyy"
              showMonthYearPicker
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              maxDate={dayjs().endOf('month').toDate()}
              minDate={startDate}
              placeholderText="End Date"
            />
          </div>
          :''
       }
           </div>
          <div className='w-full flex space-x-8'>
             
           <div className='w-[60%] rounded-2xl m-4'>
          <MyChart data={chartData} />
          </div>
          <div className='flex flex-col space-y-8 mt-12 '>

          
          <div className='flex space-x-4'>
  <div className='w-56 h-42 shadow-xl rounded-2xl flex flex-col bg-white '>
    <div className='m-2 bg-gradient-to-r from-red-400 to-red-200 h-12 rounded-2xl flex justify-center items-center '><TbMoneybag className='text-3xl '/></div>
    <div className='flex flex-col m-4'>
    <p className='text-center text-3xl font-bold text-red-400'>  &#8377;{earningsdata}</p>
    <p className='text-center text-gray-700'>
      Earnings
    </p>
    
      </div>
    
  </div>
  
  <div className='w-56 h-42 shadow-xl rounded-2xl flex flex-col bg-white  '>
    <div className='m-2 bg-gradient-to-r from-blue-400 to-blue-200 h-12 rounded-2xl flex justify-center items-center '><FaUserFriends className='text-3xl '/></div>
    <div className='flex flex-col m-4'>
    <p className='text-center text-3xl font-bold text-blue-400'>{registrationCount && registrationCount.length > 0
                        ? registrationCount[0].tot
                        : '0'}</p>
    <p className='text-center text-gray-700'>
     Registrations
    </p>
    
      </div>
    
  </div>
</div>
   <div className='bg-white w-full rounded-2xl shadow-xl '>
  
    <MyPieChart data={piechartdata}/>
   </div>

    </div>
              
          </div>

          
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Dashboard;
