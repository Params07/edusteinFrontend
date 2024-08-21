import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
const MyPieChart = ({data = []}) => {
    if(data.length == 0){
        return <div className='h-[300px] w-[450px] flex justify-center items-center'>
      <p>
      No data available 
      </p>
        </div>
    }
    const pieData = data.map((item,id) => ({
        id:id,
        value: Number(item.value) ,
        label: item.name,
      }));
      
  return (
    <PieChart
    series={[
        {
          data:[...pieData],
          innerRadius: 30,
          outerRadius: 100,
          paddingAngle: 5,
          cornerRadius: 5,
          startAngle: -90,
          endAngle: 180,
          cx: 150,
          cy: 150,
        }
      ]}
      width={450}
      height={300}
    
    />
  )
}

export default MyPieChart