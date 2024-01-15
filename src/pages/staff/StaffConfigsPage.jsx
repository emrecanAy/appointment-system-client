import React, { useEffect, useState } from "react";
import { Form, Row, Col, Card } from "antd";
import { useParams } from "react-router-dom";
import StaffConfigService from "../../api/StaffConfigService.ts";
import StaffService from "../../api/StaffService.ts";
import StaffConfigForm from "../../components/StaffConfigForm.jsx";
import cogwheel from "../../global/cogwheel.png";
import StaffForm from "./StaffForm.jsx";

//Services
const staffService = new StaffService();
const staffConfigService = new StaffConfigService();

const StaffConfigsPage = () => {
  //States
  const [staff, setStaff] = useState(null);
  const [staffConfig, setStaffConfig] = useState(null);

  const [form] = Form.useForm();

  const { staffId } = useParams();

  /* REQUESTS */
  const getStaffById = async () => {
    if (staffId) {
      try {
        const response = await staffService.getStaffById(staffId);
        setStaff(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getStaffConfigByStaffId = async () => {
    try {
      const response = await staffConfigService.getStaffConfigByStaffId(
        staffId
      );
      const data = response.data;
      console.log(data);
      const formattedStaffConfig = {
        staffConfigId: data.staffConfigId,
        startShiftHour: formatHour(data.startShiftHour),
        endShiftHour: formatHour(data.endShiftHour),
        breakHour: formatHour(data.breakHour),
        breakTime: data.breakTime,
        slotSpacing: data.slotSpacing,
        staff: data.staff,
      };
      console.log("STAFF CONFIG: ", formattedStaffConfig);
      setStaffConfig(formattedStaffConfig);
    } catch (error) {
      console.error(error);
    }
  };

  const formatHour = (input) => {
    if (Array.isArray(input) && input.length === 2) {
      let hour = String(input[0]).padStart(2, '0');
      let minute = String(input[1]).padStart(2, '0');
      
      return `${hour}:${minute}`;
    } else {
      return "Geçersiz giriş formatı.";
    }
  };

  useEffect(() => {
    if (staffId) {
      getStaffById(staffId);
      getStaffConfigByStaffId();
    }
  }, [staffId]);

  useEffect(() => {
    // staff state'i değiştiğinde formun başlangıç değerlerini güncelle
    form.setFieldsValue(staff);
  }, [staff, form]);

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Kişisel Bilgiler Formu */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <img src={staff.imagePath} alt="User" style={{ width: "25%" }} />
              <h2 id={"fullname"} style={{ marginTop: "10px" }}>
                {staff ? staff.firstName + " " + staff.lastName : "Loading..."}
              </h2>
            </div>
            <StaffForm staff={staff} staffService={staffService} />
          </Card>
        </Col>

        {/* Ayarlar Formu */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <img src={cogwheel} alt="User" style={{ width: "10%" }} />
              <h2 id={"fullname"} style={{ marginTop: "10px" }}>
                Mesai Ayarlarım
              </h2>
            </div>
            <StaffConfigForm
              staff={staff}
              staffService={staffService}
              staffConfig={staffConfig}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffConfigsPage;
