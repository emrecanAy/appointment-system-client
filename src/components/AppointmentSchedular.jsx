import { Button, DatePicker, Popconfirm, Radio, message } from "antd";
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
  const [selectedDate, setSelectedDate] = useState("");
  const [isDateSelected, setIsDateSelected] = useState(false);

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

  const createAppointment = async () => {
    const appointmentToAdd = {
      staffId: staffId,
      customerId: "b2961bbe-260f-4693-bd1a-8fcd63388c91", //giriş yapmış customer'ın id'si gelecek. Test için statik gireceğim.
      appointmentDate: selectedDate,
      appointmentHour: selectedAppointment,
      note: notes,
      staffCareServices: selectedServices,
    };

    try {
      const response = await appointmentService.createAppointment(
        appointmentToAdd
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  /* FILTERS */
  /* Tüm randevular içinden yalnızca seçilen gündekileri filtreliyor. */
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

  /* Tüm izinler içinden yalnızca seçilen gündekileri filtreliyor. */
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

  /* Önceden alınmış randevu slotlarını filtreliyor. */
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

  /* Önceden alınmış izin slotlarını filtreliyor. */
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

  /* Toplam işlem süresi sıradaki randevuyla çakışıyor mu? */
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
      appointmentHour.setSeconds(0); //10:00

      var newHour = new Date();
      newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
      newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
      newHour.setSeconds(0);
      console.log(newHour); //09:00 //En fazla 1 saatlik işlem alınabilir.

      for (let i = 0; i <= appointments.length; i++) {
        newHour.setMinutes(newHour.getMinutes() + slotSpacing);

        const stringAppointmentHour = `${appointmentHour.getHours()}:${appointmentHour.getMinutes()}`;
        const stringNewHour = `${newHour.getHours()}:${newHour.getMinutes()}`;
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
            newHour.getMinutes() + parseInt(totalDuration)
          ); //burada selectedHour değişmeyecek sandım. Ama setMinutes dediğim için direkt kendisi değişmiş;

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
      }
    });
  };

  /* Toplam işlem süresi mola saatiyle çakışıyor mu? */
  const checkIfTotalDurationExceedsBreak = (selectedAppointment) => {
    // Seçilen saati al.
    // Break'e bak.
    // Bu seçilen saattaki işlemlerin süre toplamı mola saatini geçiyorsa "alamazsınız" uyarı çıkar.
    // Geçmiyorsa da randevu alınabilsin.

    var newHour = new Date();
    newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
    newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
    newHour.setSeconds(0);
    console.log("NEW HOUR: ", newHour);

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

  /* Toplam işlem süresi izin saatiyle çakışıyor mu? */
  const checkIfTotalDurationExceedsPermission = (selectedAppointment) => {
    //Aynı işlem izin saatine de gerekebilir.
    // Seçilen saati al.
    // filteredPermissionsData içerisindeki seçilen saatten sonraki ilk izin saatine bak.
    // Bu seçilen saattaki işlemlerin süre toplamı izin saatini geçiyorsa "alamazsınız" uyarı çıkar.
    // Geçmiyorsa da randevu alınabilsin.
    filteredPermissionsData.forEach((data) => {
      var permissionStartHour = new Date();
      const startHour = data.permissionStartHour[0];
      const startMinute = data.permissionStartHour[1];
      permissionStartHour.setHours(parseInt(startHour));
      permissionStartHour.setMinutes(parseInt(startMinute));
      permissionStartHour.setSeconds(0);

      var permissionEndHour = new Date();
      const endHour = data.permissionEndHour[0];
      const endMinute = data.permissionEndHour[1];
      permissionEndHour.setHours(parseInt(endHour));
      permissionEndHour.setMinutes(parseInt(endMinute));
      permissionEndHour.setSeconds(0);

      var newHour = new Date();
      newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
      newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
      newHour.setSeconds(0);
      console.log(newHour);

      newHour.setMinutes(newHour.getMinutes() + slotSpacing);

      const stringPermissionStartHour = `${permissionStartHour.getHours()}:${permissionStartHour.getMinutes()}`;
      const stringPermissionEndHour = `${permissionEndHour.getHours()}:${permissionEndHour.getMinutes()}`;
      const stringNewHour = `${newHour.getHours()}:${newHour.getMinutes()}`;
      if (stringNewHour.trim() === stringPermissionStartHour.trim()) {
        let totalDuration = 0;
        selectedServices.forEach((service) => {
          totalDuration += service.careServiceDuration;
        });

        var selectedHour = new Date();
        selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
        selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
        selectedHour.setSeconds(0);

        const newDurationHour = selectedHour.setMinutes(
          newHour.getMinutes() + parseInt(totalDuration)
        );

        selectedHour.setHours(parseInt(selectedAppointment.split(":")[0]));
        selectedHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
        selectedHour.setSeconds(0);
        if (newDurationHour > permissionStartHour) {
          const differenceInMinutes = Math.round(
            (permissionStartHour - selectedHour) / (1000 * 60)
          );
          console.log(
            `Seçtiğiniz işlemlerin toplam süresi kuaförün izin saatini aşmaktadır! İzin saati: ${stringPermissionStartHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes}`
          );
          message.warning(
            `Seçtiğiniz işlemlerin toplam süresi kuaförün izin saatini aşmaktadır! İzin Başlangıç Saati: ${stringPermissionStartHour} | İzin Bitiş Saati: ${stringPermissionEndHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes} dakika.`
          );
        }
      }
    });
  };

  /* Toplam işlem süresi mesai bitiş saatiyle çakışıyor mu? */
  const checkIfTotalDurationExceedsEndShiftHour = (selectedAppointment) => {
    var newHour = new Date();
    newHour.setHours(parseInt(selectedAppointment.split(":")[0]));
    newHour.setMinutes(parseInt(selectedAppointment.split(":")[1]));
    newHour.setSeconds(0);
    console.log("NEW HOUR: ", newHour);

    var endShiftHour = new Date();
    endShiftHour.setHours(staffConfig.endShiftHour[0]);
    endShiftHour.setMinutes(staffConfig.endShiftHour[1]);
    endShiftHour.setSeconds(0);

    if (newHour < endShiftHour) {
      let totalDuration = 0;
      selectedServices.forEach((service) => {
        totalDuration += service.careServiceDuration;
      });

      const stringEndShiftHour = `${endShiftHour.getHours()}:${endShiftHour.getMinutes()}`;

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
      if (newDurationHour > endShiftHour) {
        // Zaman dilimi farkını dikkate alarak iki tarih arasındaki farkı alalım ve dakika cinsine çevirelim
        const differenceInMinutes = Math.round(
          (endShiftHour - selectedHour) / (1000 * 60)
        );
        console.log(
          `Seçtiğiniz işlemlerin toplam süresi kuaförünüzün mesai bitiş saatini aşmaktadır! Mesai Bitiş Saati: ${stringEndShiftHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes}`
        );
        message.warning(
          `Seçtiğiniz işlemlerin toplam süresi kuaförünüzün mesai bitiş saatini aşmaktadır! Mesai Bitiş Saati: ${stringEndShiftHour}. Alabileceğiniz maksimum işlem süresi: ${differenceInMinutes} dakika.`
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

  /* FORMATTINGS */
  function formatDate([hours, minutes]) {
    const date = new Date(null, null, null, hours, minutes);
    return date;
  }

  function formatMinutes(minute) {
    if (minute < 60) {
      return minute + " dakika";
    } else {
      var hour = Math.floor(minute / 60);
      var remainingMinutes = minute % 60;

      if (remainingMinutes === 0) {
        return hour + " saat";
      } else {
        return hour + " saat " + remainingMinutes + " dakika";
      }
    }
  }

  /* CALCULATINGS */
  const getTotalServiceDuration = (selectedServices) => {
    let totalDuration = 0;
    selectedServices.forEach((service) => {
      totalDuration += service.careServiceDuration;
    });
    return totalDuration;
  };

  const getTotalServicePrice = (selectedServices) => {
    let totalPrice = 0;
    selectedServices.forEach((service) => {
      totalPrice += service.careServicePrice;
    });
    return totalPrice;
  };

  /* HANDLING CHANGES */
  const handleRadioChange = (event) => {
    setSelectedAppointment(event.target.value);
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date);
    if (dateString.length > 0) {
      setIsDateSelected(true);
    } else {
      setIsDateSelected(false);
    }
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

  const handlePopconfirm = (e) => {
    createAppointment();
    message.success("Randevu başarılı bir şekilde alındı.");
  };
  const handlePopcancel = (e) => {
    message.error("Randevu işlemi iptal edildi!");
  };

  /* USE EFFECTS */
  useEffect(() => {
    if (selectedAppointment) {
      checkIfTotalDurationExceedsNextAppointment(selectedAppointment);
      checkIfTotalDurationExceedsBreak(selectedAppointment);
      checkIfTotalDurationExceedsPermission(selectedAppointment);
      checkIfTotalDurationExceedsEndShiftHour(selectedAppointment); //üzerinde düşünülmeli!
    }
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
      {!loading && staffConfig? (
        <>
          <div>
            {selectedServices.length > 0 ? (
              <div style={{ marginTop: "35px" }}>
                <h2>Tarih</h2>
                <DatePicker
                  placeholder="Tarih seç"
                  onChange={handleDateChange}
                  style={{ marginBottom: "20px" }}
                />
              </div>
            ) : (
              <></>
            )}

            {isDateSelected ? (
              <>
                <h2>Uygun Randevu Saatleri</h2>
                {appointments.length > 0 ? (
                  <Radio.Group
                    buttonStyle="solid"
                    style={{ marginBottom: "20px" }}
                  >
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
                ) : (
                  <h2>Bütün randevular dolu!</h2>
                )}

                {selectedAppointment && isDateSelected ? (
                  <>
                    <p>Seçilen Randevu Saati: {selectedAppointment}</p>
                    <p>
                      Toplam İşlem Süresi:{" "}
                      {formatMinutes(getTotalServiceDuration(selectedServices))}
                    </p>
                    <p>
                      Toplam İşlem Tutarı:{" "}
                      {getTotalServicePrice(selectedServices)}₺
                    </p>
                  </>
                ) : (
                  <></>
                )}

                <p></p>
                <TextArea
                  onChange={handleNotesChange}
                  rows={4}
                  placeholder="Notlarınızı ekleyin"
                  maxLength={250}
                  style={{ maxWidth: "500px" }}
                />
                <br />
                <br />
                <Popconfirm
                  title="Randevu"
                  description="Belirtilen tarih ve saatte randevu almak istediğinize emin misiniz?"
                  onConfirm={handlePopconfirm}
                  onCancel={handlePopcancel}
                  okText="Evet"
                  cancelText="Hayır"
                >
                  <Button>Randevu Oluştur</Button>
                </Popconfirm>
              </>
            ) : (
              <></>
            )}
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default AppointmentScheduler;
