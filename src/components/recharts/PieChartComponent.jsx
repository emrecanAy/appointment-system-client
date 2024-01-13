import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'January', value: 100 },
  { name: 'February', value: 150 },
  { name: 'March', value: 150 },
  { name: 'April', value: 150 },
  { name: 'May', value: 150 },
  { name: 'June', value: 150 },
  { name: 'September', value: 150 },
  { name: 'October', value: 150 },
  { name: 'November', value: 150 },
  { name: 'December', value: 150 },
  // ... Other months
];

const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF5733'];

const PieChartComponent = () => {
  return (
    <div className="pie-chart">
      <PieChart width={400} height={400}>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
