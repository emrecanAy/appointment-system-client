// TotalStatsCard.js
import React from 'react';
import { Card, Statistic } from 'antd';

const TotalStatsCard = ({ title, value }) => (
  <Card>
    <Statistic title={title} value={value} />
  </Card>
);

export default TotalStatsCard;
