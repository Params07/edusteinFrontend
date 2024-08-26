import React from 'react';
import { styled } from '@mui/system';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ChartContainer = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: theme.spacing(4),
  borderRadius:'16px',
  
  backgroundColor: theme.palette.background.paper,
}));

const NoDataMessage = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  
  fontSize: theme.typography.h6.fontSize,
  color: theme.palette.text.secondary,
}));


const MyChart = ({ data = [] }) => { 
 
  if (data.length === 0) {
    return (
      <ChartContainer>
        <NoDataMessage>No data available</NoDataMessage>
      </ChartContainer>
    );
  }

  

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height={450} >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_amount" fill="#8884d8" barSize={50} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default MyChart;
