import React, { useEffect, useState } from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Card,
  Table,
  message,
  Popconfirm,
  Statistic,
  Space,
} from "antd";
import CountUp from "react-countup";
import { useParams } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import moment from "moment";
import "moment/locale/tr";

import StaffService from "../api/StaffService.ts";
import AppointmentService from "../api/AppointmentService.ts";
import StaffCareServiceService from "../api/StaffCareServiceService.ts";
import EditStaffCareServiceModal from "../components/EditStaffCareServiceModal.jsx";
import { PermissionService } from "../api/PermissionService.ts";
import EditPermissionModal from "../components/EditPermissionModal.jsx";
import StaffForm from "../components/StaffForm.jsx";

//Services
const staffService = new StaffService();
const appointmentService = new AppointmentService();
const staffCareServiceService = new StaffCareServiceService();
const permissionService = new PermissionService();

const StaffDetail = () => {
  //States
  const [staff, setStaff] = useState(null);
  const [totalEarning, setTotalEarning] = useState(0);
  const [acceptedAppointments, setAcceptedAppointments] = useState([]);
  const [staffCareServices, setStaffCareServices] = useState([]);
  const [permissions, setPermissions] = useState([]);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editPermissionModalVisible, setEditPermissionModalVisible] =
    useState(false);
  const [selectedStaffCareService, setSelectedStaffCareService] = useState({});
  const [selectedPermission, setSelectedPermission] = useState({});

  const [form] = Form.useForm();

  const { staffId } = useParams();

  const getStaffById = async () => {
    try {
      const response = await staffService.getStaffById(staffId);
      setStaff(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllAcceptedAppointmentsByStaff = async (staffId) => {
    try {
      const response =
        await appointmentService.getAllAcceptedAppointmentsByStaff(staffId);
      setAcceptedAppointments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllPermissionsByStaff = async (staffId) => {
    try {
      const response = await permissionService.getAllByStaff(staffId);
      setPermissions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getTotalEarningsByStaff = async (staffId) => {
    try {
      const response = await appointmentService.getTotalEarningsByStaff(
        staffId
      );
      setTotalEarning(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllStaffCareServicesByStaff = async (staffId) => {
    try {
      const response = await staffCareServiceService.getAllByStaff(staffId);
      setStaffCareServices(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditPermission = (record) => {
    console.log("TEST STAFF DETAIL", record)
    setSelectedPermission(record);
    setEditPermissionModalVisible(true);
  } 

  const handleEditStaffCareService = (record) => {
    setSelectedStaffCareService(record);
    setEditModalVisible(true);
  };

  const handleUpdateStaffCareService = async (values) => {
    values.staffCareServiceId = selectedStaffCareService.staffCareServiceId;
    values.careServiceId = selectedStaffCareService.careService.careServiceId;
    values.staffId = selectedStaffCareService.staff.staffId;

    const response = await staffCareServiceService.updateStaffCareService(
      values
    );
    message.success("Güncellendi!");
    console.log("Güncelleme işlemi:", values);
    console.log(response);
    setEditModalVisible(false);
  };

  const handleUpdatePermission = async (values) => {
    
    setEditModalVisible(false);
  };

  const onCareServiceDeleteConfirm = async (record) => {
    console.log(record);
    const response = await staffCareServiceService.deleteStaffCareService(
      record
    );
    console.log(response);
    message.success(`silindi!`);
  };
  const onPermissionDeleteCancel = (e) => {
    message.error("İptal edildi!");
  };

  const onPermissionDeleteConfirm = async (record) => {
    console.log(record);
    await permissionService.deletePermission(record);
    getAllPermissionsByStaff(staffId);
    message.success(`silindi!`);
  };
  const onCareServiceDeleteCancel = (e) => {
    message.error("İptal edildi!");
  };

  useEffect(() => {
    getStaffById();
    getTotalEarningsByStaff(staffId);
    getAllAcceptedAppointmentsByStaff(staffId);
    getAllStaffCareServicesByStaff(staffId);
  }, [staffId, staffCareServices]);

  useEffect(() => {
    // staff state'i değiştiğinde formun başlangıç değerlerini güncelle
    form.setFieldsValue(staff);
  }, [staff, form]);

  useEffect(() => {
    getAllPermissionsByStaff(staffId);
  }, [staffId]);

  const formatPermissionDate = (dateString) => {
    const formattedDate = moment(dateString, "YYYYMMDDHHmmssSSS").locale("tr").format(
      "YYYY-MM-DD HH:mm:ss"
    );
    return formattedDate;
  };

  const formatPermissionHour = (hourString) => {
    const formattedHour = moment(hourString, "HHmm").format("HH:mm");
    return formattedHour;
  };

  const serviceColumns = [
    {
      title: "Hizmet",
      dataIndex: ["careService", "careServiceName"],
      key: "careService.careServiceName",
    },
    { title: "Fiyat", dataIndex: "careServicePrice", key: "careServicePrice" },
    {
      title: "Süre",
      dataIndex: "careServiceDuration",
      key: "careServiceDuration",
    },
    {
      title: "İşlemler",
      key: "edit",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditStaffCareService(record)}
            />
          </Space>
          <Space size="middle">
            <Popconfirm
              title="Sil"
              description="Silmek istediğinize emin misiniz?"
              onConfirm={() => onCareServiceDeleteConfirm(record)}
              onCancel={onCareServiceDeleteCancel}
              okText="Evet"
              cancelText="İptal"
            >
              <Button
                type="primary"
                style={{ backgroundColor: "firebrick", marginLeft: 5 }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  const permissionColumns = [
    {
      title: "Tarih",
      dataIndex: "permissionDate",
      key: "permissionDate",
      render: (text) => formatPermissionDate(text),
    },
    {
      title: "Saat Aralığı",
      key: "timeRange",
      render: (text, record) => (
        <>
          {formatPermissionHour(record.permissionStartHour) +
            "-" +
            formatPermissionHour(record.permissionEndHour)}
        </>
      ),
    },
    { title: "Sebep", dataIndex: "permissionReason", key: "permissionReason" },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "İşlemler",
      key: "edit",
      render: (text, record) => (
        <>
          <Space size="middle">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => handleEditPermission(record)}
            />
          </Space>
          <Space size="middle">
            <Popconfirm
              title="Sil"
              description="Silmek istediğinize emin misiniz?"
              onConfirm={() => onPermissionDeleteConfirm(record)}
              onCancel={onPermissionDeleteCancel}
              okText="Evet"
              cancelText="İptal"
            >
              <Button
                type="primary"
                style={{ backgroundColor: "firebrick", marginLeft: 5 }}
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </Space>
        </>
      ),
    },
  ];

  if (!staff) {
    return <div>Loading...</div>;
  }

  const formatter = (value) => <CountUp end={value} separator="," />;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row gutter={[16, 16]}>
        {/* Form */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <div style={{ marginBottom: "20px" }}>
              <img src={staff.imagePath} alt="User" style={{ width: "25%" }} />
              <h2 id={"fullname"}>
                {staff ? staff.firstName + " " + staff.lastName : "Loading..."}
              </h2>
            </div>
            <StaffForm staff={staff} staffService={staffService}/>
          </Card>
        </Col>

        {/* Hizmetler ve İzinler */}
        <Col span={12}>
          <Card style={{ width: "100%" }}>
            <Row gutter={16}>
              <Col span={12}>
                <Statistic
                  title="Toplam İşlem"
                  value={acceptedAppointments.length}
                  precision={2}
                  formatter={formatter}
                />
              </Col>
              <Col span={12}>
                <Statistic
                  title="Toplam Kazanç(₺)"
                  value={totalEarning}
                  formatter={formatter}
                />
              </Col>
            </Row>
          </Card>

          <Card title="Hizmetler" style={{ width: "100%" }}>
            <Table
              dataSource={staffCareServices}
              columns={serviceColumns}
              size="small"
              rowKey={(record) => record.staffCareServiceId}
            />
            {/* Edit Modal */}
            <EditStaffCareServiceModal
              visible={editModalVisible}
              onCancel={() => setEditModalVisible(false)}
              onUpdate={handleUpdateStaffCareService}
              initialValues={selectedStaffCareService}
            />
          </Card>

          <Card title="İzinler" style={{ width: "100%" }}>
            <Table
              dataSource={permissions}
              columns={permissionColumns}
              size="small"
              rowKey={(record) => record.permissionId}
            />
    
            <EditPermissionModal
              visible={editPermissionModalVisible}
              onCancel={() => setEditPermissionModalVisible(false)}
              onUpdate={handleUpdatePermission}
              initialValues={selectedPermission}
            ></EditPermissionModal>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StaffDetail;
