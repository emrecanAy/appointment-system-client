import React, { useState } from "react";
import "./Team.css";
import { useNavigate } from "react-router-dom";
import { List, Typography } from "antd";
const { Text } = Typography;

function TeamCard({
  staffId,
  firstName,
  lastName,
  jobTitle,
  staffCareServices,
  imagePath,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/staff-detail/${staffId}`);
  };

  return (
    <div
      className={isHovered ? 'column hand-cursor' : 'column'}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="team-9">
        <div className="team-img">
          <img src={imagePath} alt={"team1"} />
        </div>
        <div className="team-content">
          <h2>
            {firstName} {lastName}
          </h2>
          <h3>{jobTitle} &amp; Founder</h3>
        </div>
        <div className="team-overlay">
          <h4>
            <i>Hizmetler</i>
          </h4>
          <List style={{ alignContent: "center" }}>
            {staffCareServices.map((service) => (
              <List.Item key={service.staffCareServiceId}>
                <Text strong>{service.careService.careServiceName}</Text>
              </List.Item>
            ))}
          </List>
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
