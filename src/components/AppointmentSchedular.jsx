import { Button, DatePicker, Input, Radio } from "antd";
import React, { useEffect, useState } from "react";
import StaffConfigService from "../api/StaffConfigService.ts";
import AppointmentService from "../api/AppointmentService.ts";
import TextArea from "antd/es/input/TextArea";

const appointmentService = new AppointmentService();
const staffConfigService = new StaffConfigService();

const AppointmentScheduler = ({ staffId }) => {
  const [staffConfig, setStaffConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waitingAndAcceptedAppointments, setWaitingAndAcceptedAppointments] =
    useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [filteredData, setFilteredData] = useState(
    waitingAndAcceptedAppointments
  );
  const [notes, setNotes] = useState("");

  const [startShiftHour, setStartShiftHour] = useState(null);
  const [endShiftHour, setEndShiftHour] = useState(null);
  const [slotSpacing, setSlotSpacing] = useState(30);
  const [breakHour, setBreakHour] = useState(null);
  const [breakTime, setBreakTime] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState("");

  //   const startHour = new Date(null, null, null, 9, 30);
  //   const endHour = new Date(null, null, null, 20, 30);
  //   const slotInterval = 30;
  //   const testbreakHour = new Date(null, null, null, 13, 0);

  const filterData = (data, dateString) => {
    const result = data.filter((item) => {
      const date = item.appointmentDate;
      const jsDate = new Date(
        date[0],
        date[1] - 1,
        date[2] - 6,
        date[3],
        date[4],
        date[5],
        date[6]
      );
      const formattedDate = jsDate.toISOString().split("T")[0];
      return formattedDate === dateString;
    });

    return result;
  };
  const generateAppointments = () => {
    const appointments = [];

    if (
      !staffConfig ||
      startShiftHour === null ||
      endShiftHour === null ||
      breakHour === null
    ) {
      return appointments;
    }

    var currentHour = new Date(startShiftHour); // Mevcut saati tutan değişken
    while (currentHour < endShiftHour) {
      // Mevcut saatin mola saatleri arasında olup olmadığını kontrol et
      var isBreakTime = false; // Mola zamanı olup olmadığını tutan değişken
      var breakStart = new Date(breakHour); // Mola başlangıç saati
      var breakEnd = new Date(breakHour); // Mola bitiş saati
      breakEnd.setMinutes(breakEnd.getMinutes() + breakTime); // Mola bitiş saatini mola süresi kadar ileri al
      if (currentHour >= breakStart && currentHour < breakEnd) {
        // Mevcut saat mola saatleri arasındaysa
        isBreakTime = true; // Mola zamanı değişkenini true yap
      }
      // Mola zamanı değilse
      if (!isBreakTime) {
        // Mevcut saati appointments dizisine ekle
        appointments.push(new Date(currentHour));
      }
      // Mevcut saati slotInterval kadar ileri al
      currentHour.setMinutes(currentHour.getMinutes() + slotSpacing);
    }
    return appointments;
  };

  function formatDate([hours, minutes]) {
    const date = new Date(null, null, null, hours, minutes);
    return date;
  }

  const handleRadioChange = (event) => {
    setSelectedAppointment(event.target.value);
  };

  const handleDateChange = (date, dateString) => {
    const data = filterData(waitingAndAcceptedAppointments, dateString);
    setFilteredData(data);
    console.log("FİLTERED: ", data);
  };

  const getStaffConfigByStaff = async (staffId) => {
    try {
      const response = await staffConfigService.getStaffConfigById(staffId);
      setStaffConfig(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getAllAppointmentsByStaff = async (staffId) => {
    try {
      const response =
        await appointmentService.getAllAcceptedAndWaitingAppointmentsByStaff(
          staffId
        );
      setWaitingAndAcceptedAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  useEffect(() => {
    getStaffConfigByStaff(staffId);
    getAllAppointmentsByStaff(staffId);
  }, [staffId]);

  useEffect(() => {
    if (!loading && staffConfig) {
      const formattedStartHour = formatDate(staffConfig.startShiftHour);
      const formattedEndHour = formatDate(staffConfig.endShiftHour);
      const slotSpacing = staffConfig.slotSpacing;
      const formattedBreakHour = formatDate(staffConfig.breakHour);
      const breakTime = staffConfig.breakTime;
      setStartShiftHour(formattedStartHour);
      setEndShiftHour(formattedEndHour);
      setSlotSpacing(slotSpacing);
      setBreakHour(formattedBreakHour);
      setBreakTime(breakTime);
    }
  }, [loading, staffConfig]);

  const appointments = generateAppointments();

  const filterBookedHours = () => {
    filteredData.forEach(function (appointment) {
      console.log("TOTAL DURATION: ", appointment.totalDuration);
      var index = appointments.findIndex(function (time) {
        return (
          time.getHours() ===
            parseInt(appointment.appointmentHour.split(":")[0]) &&
          time.getMinutes() ===
            parseInt(appointment.appointmentHour.split(":")[1])
        );
      });

      if (index !== -1) {
        // appointmentHour üzerine totalDuration ekleyerek yeni bir saat oluştur
        var oldHour = new Date(appointments[index]);
        var newHour = new Date(appointments[index]);
        newHour.setMinutes(newHour.getMinutes() + appointment.totalDuration);
        console.log("YENİ SAAT: ", newHour);
        console.log("ESKİ SAAT: ", oldHour);

        const hoursToDelete = [];
        // oldHour'un değerini değiştirmemek için kopyasını al
        var currentHour = new Date(oldHour);
        while (
          currentHour <=
          newHour.setMinutes(newHour.getMinutes() - slotSpacing / 2)
        ) {
          // currentHour'u değiştirmemek için kopyasını al
          hoursToDelete.push(new Date(currentHour));
          currentHour.setMinutes(currentHour.getMinutes() + slotSpacing);
          console.log("CURRENT HOUR: ", currentHour);
        }

        // hoursToDelete içindeki saatleri appointments dizisinden sil
        hoursToDelete.forEach(function (deleteHour) {
          var deleteIndex = appointments.findIndex(function (time) {
            return (
              time.getHours() === deleteHour.getHours() &&
              time.getMinutes() === deleteHour.getMinutes()
            );
          });

          if (deleteIndex !== -1) {
            appointments.splice(deleteIndex, 1);
          }
        });
      }

      if (index !== -1) {
        appointments.splice(index, 1);
      }
    });

    console.log("Hadi aslanım benim!: ", appointments);
  };

  filterBookedHours();

  return (
    <div>
      {!loading && staffConfig && appointments.length > 0 ? (
        <>
          <div>
            <div style={{ marginTop: "35px" }}>
              <h2>Tarih Seç</h2>
              <DatePicker
                onChange={handleDateChange}
                style={{ marginBottom: "20px" }}
              />
            </div>

            <h2>Uygun Randevu Saatleri</h2>

            <Radio.Group buttonStyle="solid" style={{ marginBottom: "20px" }}>
              {appointments.map((appointment) => (
                <Radio.Button
                  key={appointment.getTime()}
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

          <TextArea rows={4} placeholder="Notlarınızı ekleyin" maxLength={6} style={{maxWidth: "500px"}}/>
          <br/><br/>
          <Button>Randevu Oluştur</Button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
