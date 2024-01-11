import { Button, DatePicker, Radio } from "antd";
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

  const deprecatedFilterData = (data, dateString) => {
    console.log(
      "WAİTİNG ACCEPTED APPOINTMENTS: ",
      waitingAndAcceptedAppointments
    );
    console.log("DATE STRİNG", dateString);
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
      // Saat, dakika, saniye ve milisaniyeyi sıfırla
      jsDate.setHours(0, 0, 0, 0);
      // Karşılaştırılacak tarih nesnesini de sıfırla
      const compareDate = new Date(dateString);
      compareDate.setHours(0, 0, 0, 0);
      // Zaman damgalarını karşılaştır
      return jsDate.getTime() === compareDate.getTime();
    });

    return result;
  };

  const filterData = (data, dateString) => {
    // Veriyi filter metodu ile filtreleyelim
    var sonuc = data.filter(function (eleman) {
      // Her bir elemanın appointmentDate özelliğinin ilk üç elemanını alalım
      var yil = eleman.appointmentDate[0];
      var ay = eleman.appointmentDate[1];
      var gun = eleman.appointmentDate[2];
      // Bu değerlerden yeni bir tarih nesnesi oluşturalım
      var elemanTarihi = new Date(yil, ay - 1, gun + 1); // Ay değeri 0'dan başladığı için 1 çıkardık
      // Elemanın tarihini istenen tarih ile karşılaştıralım
      console.log("KONTROL TARİHİ: ", elemanTarihi.toISOString().slice(0, 10));
      console.log("İSTENEN TARİH: ", dateString);
      return elemanTarihi.toISOString().slice(0, 10) === dateString;
    });

    console.log("TEST FİLTER DATA: ", sonuc);
    return sonuc;
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
    while (currentHour <= endShiftHour) {
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
    filterData(waitingAndAcceptedAppointments, dateString);
    const data = filterData(waitingAndAcceptedAppointments, dateString);
    setFilteredData(data);
    console.log("FİLTERED: ", data);
  };

  const getStaffConfigByStaff = async (staffId) => {
    try {
      const response = await staffConfigService.getStaffConfigById(staffId);
      setStaffConfig(response.data);
      console.log("STAFF CONFIG: ", response.data);
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

  let appointments = generateAppointments();
  console.log("saatler:", appointments);

  const filterBookedHours = () => {
    filteredData.forEach((appointment) => {
      // Randevunun başlangıç saatini ve süresini alıyorum
      let startHour = appointment.appointmentHour;
      let duration = appointment.totalDuration;

      // Başlangıç saatini ve süreyi dakika cinsinden sayısal değerlere dönüştürüyorum
      let startMinutes =
        parseInt(startHour.split(":")[0]) * 60 +
        parseInt(startHour.split(":")[1]);
      let durationMinutes = parseInt(duration);

      // Randevunun bitiş saatini dakika cinsinden hesaplıyorum
      let endMinutes = startMinutes + durationMinutes;

      // Randevunun başlangıç ve bitiş saatlerini saat:dakika formatına dönüştürüyorum
      let endHour =
        Math.floor(endMinutes / 60) +
        ":" +
        (endMinutes % 60).toString().padStart(2, "0");
      startHour =
        Math.floor(startMinutes / 60) +
        ":" +
        (startMinutes % 60).toString().padStart(2, "0");

      // Randevunun başlangıç ve bitiş saatlerini appointments dizisinde arıyorum
      // Eğer bulursam, o saatleri diziden çıkarıyorum
      appointments = appointments.filter((app) => {
        // appointments dizisindeki her bir saat için saat kısmını alıyorum
        app = app.toString();
        let appHour = app.split(" ")[4];
        // Saat kısmını dakika cinsinden sayısal değere dönüştürüyorum
        let appMinutes =
          parseInt(appHour.split(":")[0]) * 60 +
          parseInt(appHour.split(":")[1]);
        // Eğer randevunun başlangıç ve bitiş saatleri arasında ise, false döndürüyorum
        // Böylece o saat filtrelenmiş oluyor
        return appMinutes < startMinutes || appMinutes >= endMinutes;
      });
    });

    console.log("SON METOD: ", appointments);
  };

  const deprecatedFilterBookedHours = () => {
    filteredData.forEach(function (appointment) {
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

  //filterBookedHours();
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

          <TextArea
            onChange={handleNotesChange}
            rows={4}
            placeholder="Notlarınızı ekleyin"
            maxLength={6}
            style={{ maxWidth: "500px" }}
          />
          <br />
          <br />
          {notes}
          <Button>Randevu Oluştur</Button>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
