import React from 'react';

const InfoBox = ({ title, value }) => {
  return (
    <div className="info-box">
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default InfoBox;
