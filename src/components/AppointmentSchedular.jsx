import { Button, DatePicker, Radio, message } from "antd";
import React, { useEffect, useState } from "react";
import StaffConfigService from "../api/StaffConfigService.ts";
import AppointmentService from "../api/AppointmentService.ts";
import PermissionService from "../api/PermissionService.ts";
import TextArea from "antd/es/input/TextArea";

const appointmentService = new AppointmentService();
const staffConfigService = new StaffConfigService();
const permissionService = new PermissionService();

const AppointmentScheduler = ({ staffId, selectedServices }) => {
  const [staffConfig, setStaffConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [waitingAndAcceptedAppointments, setWaitingAndAcceptedAppointments] =
    useState([]);
  const [filteredData, setFilteredData] = useState(
    waitingAndAcceptedAppointments
  );
  const [acceptedPermissions, setAcceptedPermissions] = useState(null);
  const [filteredPermissionsData, setFilteredPermissionsData] =
    useState(acceptedPermissions);
  const [notes, setNotes] = useState("");
  const [startShiftHour, setStartShiftHour] = useState(null);
  const [endShiftHour, setEndShiftHour] = useState(null);
  const [slotSpacing, setSlotSpacing] = useState(30);
  const [breakHour, setBreakHour] = useState(null);
  const [breakTime, setBreakTime] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState("");

  /* REQUESTS */
  const getAllAcceptedPermissionsByStaff = async (staffId) => {
    try {
      console.log(staffId);
      const response = await permissionService.getAllAcceptedPermissionsByStaff(
        staffId
      );
      setAcceptedPermissions(response.data);
      console.log("PERMISSIONS: ", response.data);
    } catch (error) {
      console.log(error);
    }
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

  /* FILTERS */
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
  };

  const filterPermissionHours = () => {
    if (filteredPermissionsData) {
      filteredPermissionsData.forEach((permission) => {
        // Randevunun başlangıç saatini ve süresini alıyorum
        let startHour = permission.permissionStartHour;
        let endHour = permission.permissionEndHour;

        // Başlangıç saatini ve süreyi dakika cinsinden sayısal değerlere dönüştürüyorum
        let startMinutes = parseInt(startHour[0]) * 60 + parseInt(startHour[1]);

        // Randevunun bitiş saatini dakika cinsinden hesaplıyorum
        let endMinutes = parseInt(endHour[0]) * 60 + parseInt(endHour[1]);

        // Randevunun başlangıç ve bitiş saatlerini appointments dizisinde arıyorum
        // Eğer bulursam, o saatleri diziden çıkarıyorum
        appointments = appointments.filter((apppointment) => {
          // appointments dizisindeki her bir saat için saat kısmını alıyorum
          apppointment = apppointment.toString();
          let appointmentHour = apppointment.split(" ")[4];
          // Saat kısmını dakika cinsinden sayısal değere dönüştürüyorum
          let appointmentsMinutes =
            parseInt(appointmentHour.split(":")[0]) * 60 +
            parseInt(appointmentHour.split(":")[1]);
          // Eğer randevunun başlangıç ve bitiş saatleri arasında ise, false döndürüyorum
          // Böylece o saat filtrelenmiş oluyor
          return (
            appointmentsMinutes < startMinutes ||
            appointmentsMinutes >= endMinutes
          );
        });
      });

      console.log("NEW: ", appointments);
    }
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

  const filterPermissionsData = (data, dateString) => {
    // Veriyi filter metodu ile filtreleyelim
    var sonuc = data.filter(function (eleman) {
      // Her bir elemanın appointmentDate özelliğinin ilk üç elemanını alalım
      var yil = eleman.permissionDate[0];
      var ay = eleman.permissionDate[1];
      var gun = eleman.permissionDate[2];
      // Bu değerlerden yeni bir tarih nesnesi oluşturalım
      var elemanTarihi = new Date(yil, ay - 1, gun + 1); // Ay değeri 0'dan başladığı için 1 çıkardım
      // Elemanın tarihini istenen tarih ile karşılaştıralım
      console.log("KONTROL TARİHİ: ", elemanTarihi.toISOString().slice(0, 10));
      console.log("İSTENEN TARİH: ", dateString);
      return elemanTarihi.toISOString().slice(0, 10) === dateString;
    });

    console.log("TEST FİLTER PERMİSSİONS DATA: ", sonuc);
    return sonuc;
  };

  const checkIfTotalDurationExceedsNextAppointment = (selectedAppointment) => {
    console.log(selectedAppointment);
    // Seçilen saati al.
    // Seçilen saatten sonraki ilk alınmış olan randevuyu al.
    // Bu seçilen saattaki işlemlerin süre toplamı sonraki alınmış randevunun saatini geçiyorsa "alamazsınız" uyarı çıkar.
    // Geçmiyorsa da randevu alınabilsin.
    console.log("Randevular: ", filteredData);
    filteredData.forEach((data) => {
      var appointmentHour = new Date();
      const hour = data.appointmentHour.split(":")[0];
      const minute = data.appointmentHour.split(":")[1];
      appointmentHour.setHours(parseInt(hour));
      appointmentHour.setMinutes(parseInt(minute));
      appointmentHour.setSeconds(0);

      var newHour = new Date();
      newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
      newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
      newHour.setSeconds(0);
      console.log(newHour); //Sat Jan 13 2024 10:00:00 GMT+0300 (GMT+03:00)

      newHour.setMinutes(newHour.getMinutes() + slotSpacing);

      const stringAppointmentHour = `${appointmentHour.getHours()}:${appointmentHour.getMinutes()}`;
      const stringNewHour = `${newHour.getHours()}:${newHour.getMinutes()}`;
      console.log("String New: ", stringNewHour);
      console.log("String App: ", stringAppointmentHour);
      if (stringNewHour.trim() === stringAppointmentHour.trim()) {
        console.log("EVET BULDUM: ", newHour);
        //BURADA seçilmiş saatten sonraya alınmış olan ilk randevuyu buldum.
        //Örnek: seçilmiş saat 09:00. 09:00'dan sonraya daha önceden başkası tarafından alınmış olan randevu saati ise 09:30
        //Dolayısıyla 09:00'a alınacak olan randevunun toplam işlem saati en fazla 30 dakika sürebilir. Yani bir sonraki randevu saatine kadar sürebilir.

        let totalDuration = 0;
        selectedServices.forEach((service) => {
          totalDuration += service.careServiceDuration;
        });

        //seçilen saati al.
        var selectedHour = new Date();
        selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
        selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
        selectedHour.setSeconds(0);

        console.log("Seçilen saat: ", selectedHour);
        const newDurationHour = selectedHour.setMinutes(
          //burada selectedHour değişmeyecek sandım. Ama setMinutes dediğim için direkt kendisi değişmiş;
          newHour.getMinutes() + parseInt(totalDuration)
        );

        selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
        selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
        selectedHour.setSeconds(0);
        if (newDurationHour > appointmentHour) {
          // Zaman dilimi farkını dikkate alarak iki tarih arasındaki farkı alalım ve dakika cinsine çevirelim
          const differenceInMinutes = Math.round(
            (appointmentHour - selectedHour) / (1000 * 60)
          );
          console.log(
            `Seçtiğiniz işlemlerin toplam süresi sıradaki randevuyu aşmaktadır! Sıradaki randevu saati: ${stringAppointmentHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes}`
          );
          message.warning(
            `Seçtiğiniz işlemlerin toplam süresi sıradaki randevuyu aşmaktadır! Sıradaki randevu saati: ${stringAppointmentHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes} dakika.`
          );
        }
      }
    });
  };

  const checkIfTotalDurationExceedsBreak = (selectedAppointment) => {
    //Aynı işlem izin saatine de gerekebilir.
    // Seçilen saati al.
    // Break'e bak.
    // Bu seçilen saattaki işlemlerin süre toplamı mola saatini geçiyorsa "alamazsınız" uyarı çıkar.
    // Geçmiyorsa da randevu alınabilsin.

    var newHour = new Date();
    newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
    newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
    newHour.setSeconds(0);
    console.log(newHour);

    var breakHour = new Date();
    breakHour.setHours(staffConfig.breakHour[0]);
    breakHour.setMinutes(staffConfig.breakHour[1]);
    breakHour.setSeconds(0);

    if (newHour < breakHour) {
      let totalDuration = 0;
      selectedServices.forEach((service) => {
        totalDuration += service.careServiceDuration;
      });

      const stringAppointmentHour = `${breakHour.getHours()}:${breakHour.getMinutes()}`;

      //seçilen saati al.
      var selectedHour = new Date();
      selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
      selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
      selectedHour.setSeconds(0);

      console.log("Seçilen saat: ", selectedHour);
      const newDurationHour = selectedHour.setMinutes(
        //burada selectedHour değişmeyecek sandım. Ama setMinutes dediğim için direkt kendisi değişmiş;
        newHour.getMinutes() + parseInt(totalDuration)
      );

      selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
      selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
      selectedHour.setSeconds(0);
      if (newDurationHour > breakHour) {
        // Zaman dilimi farkını dikkate alarak iki tarih arasındaki farkı alalım ve dakika cinsine çevirelim
        const differenceInMinutes = Math.round(
          (breakHour - selectedHour) / (1000 * 60)
        );
        console.log(
          `Seçtiğiniz işlemlerin toplam süresi kuaförünüzün mola saatini aşmaktadır! Sıradaki randevu saati: ${stringAppointmentHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes}`
        );
        message.warning(
          `Seçtiğiniz işlemlerin toplam süresi kuaförünüzün mola saatini Mola saati: ${stringAppointmentHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes} dakika.`
        );
      }
    }
  };

  /* GENERATIONS */
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

  /* FORMATTINGS */
  function formatDate([hours, minutes]) {
    const date = new Date(null, null, null, hours, minutes);
    return date;
  }

  /* HANDLING CHANGES */
  const handleRadioChange = (event) => {
    setSelectedAppointment(event.target.value);
  };

  const handleDateChange = (date, dateString) => {
    const data = filterData(waitingAndAcceptedAppointments, dateString);
    const permissionsData = filterPermissionsData(
      acceptedPermissions,
      dateString
    );
    setFilteredData(data);
    setFilteredPermissionsData(permissionsData);
    filterPermissionHours();
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  /* USE EFFECTS */
  useEffect(() => {
    checkIfTotalDurationExceedsNextAppointment(selectedAppointment);
    checkIfTotalDurationExceedsBreak(selectedAppointment);
  }, [selectedAppointment]);

  useEffect(() => {
    getStaffConfigByStaff(staffId);
    getAllAppointmentsByStaff(staffId);
    getAllAcceptedPermissionsByStaff(staffId);
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

  filterBookedHours();
  filterPermissionHours();
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