import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'January', customers: 50 },
  { name: 'February', customers: 80 },
  // ... Other months
];

const LineChartComponent = () => {
  return (
    <div className="line-chart">
      <h2>Customer Count Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="customers" stroke="#8884d8" />
      </LineChart>
    </div>
  );
};

export default LineChartComponent;
