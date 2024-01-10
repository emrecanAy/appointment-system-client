import { Radio } from "antd";
import React, { useEffect, useState } from "react";

const AppointmentSchedulerTest = ({ staffConfig }) => {
  const [startShiftHour, setStartShiftHour] = useState(null);
  const [endShiftHour, setEndShiftHour] = useState(null);
  const [slotSpacing, setSlotSpacing] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState("");

  const generateAppointments = () => {
    const appointments = [];
    let currentHour = new Date(startShiftHour);

    while (currentHour <= endShiftHour) {
      appointments.push(new Date(currentHour));
      currentHour.setMinutes(currentHour.getMinutes() + slotSpacing);
    }

    return appointments;
  };

  const appointments = generateAppointments();

  function formatDate([hours, minutes]) {
    const date = new Date(0, 0, 0, hours, minutes);
    return date;
  }

  const handleRadioChange = (event) => {
    setSelectedAppointment(event.target.value);
  };

  useEffect(() => {
    const formattedStartHour = formatDate(staffConfig.startShiftHour);
    const formattedEndHour = formatDate(staffConfig.endShiftHour);
    const slotSpacing = staffConfig.slotSpacing;
    setStartShiftHour(formattedStartHour);
    setEndShiftHour(formattedEndHour);
    setSlotSpacing(slotSpacing);
  }, [staffConfig]);

  return (
    <div>
      <div>
        <Radio.Group buttonStyle="solid" style={{ marginBottom: "20px" }}>
          {appointments.map((appointment) => (
            <Radio.Button
              key={appointment.getTime()} // unique key olarak appointment zamanını kullan
              value={appointment.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
              onChange={handleRadioChange}
            >
              {appointment.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <p>Seçilen Randevu Saati: {selectedAppointment}</p>
    </div>
  );
};

export default AppointmentSchedulerTest;
