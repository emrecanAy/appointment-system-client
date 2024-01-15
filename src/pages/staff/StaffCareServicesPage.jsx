import {
  Button,
  Col,
  Popconfirm,
  Row,
  Space,
  Table,
  Typography,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import StaffCareServiceService from "../../api/StaffCareServiceService.ts";
import { useParams } from "react-router-dom";
import EditStaffCareServiceModal from "./EditStaffCareServiceModal.jsx";
import AddStaffCareServiceModal from "./AddStaffCareServiceModal.jsx";

const staffCareServiceService = new StaffCareServiceService();

function StaffCareServicesPage() {
  const [staffCareServices, setStaffCareServices] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [selectedStaffCareService, setSelectedStaffCareService] = useState({});
  const { staffId } = useParams();

  const { Text } = Typography;

  const handleEditStaffCareService = (record) => {
    setSelectedStaffCareService(record);
    setEditModalVisible(true);
  };

  const handleUpdateStaffCareService = async (values) => {
    values.staffCareServiceId = selectedStaffCareService.staffCareServiceId;
    values.careServiceId = selectedStaffCareService.careService.careServiceId;
    values.staffId = selectedStaffCareService.staff.staffId;

    await staffCareServiceService.updateStaffCareService(values);
    message.success("Güncellendi!");
    setEditModalVisible(false);
  };

  const handleAddStaffCareService = async (values) => {
    values.staffId = staffId;
    try {
      await staffCareServiceService.createStaffCareService(values);
      message.success("Eklendi!");
    } catch (error) {
      console.log(error);
    }
    setAddModalVisible(false);
  };

  const onCareServiceDeleteConfirm = async (record) => {
    await staffCareServiceService.deleteStaffCareService(record);
    message.success(`silindi!`);
  };
  const onCareServiceDeleteCancel = (e) => {
    message.error("İptal edildi!");
  };

  const serviceColumns = [
    {
      title: "Hizmet",
      dataIndex: ["careService", "careServiceName"],
      key: "careService.careServiceName",
    },
    {
      title: "Açıklama",
      dataIndex: "note",
      key: "note",
    },
    { title: "Fiyat(₺)", dataIndex: "careServicePrice", key: "careServicePrice" },
    {
      title: "Süre(Dakika)",
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

  const getStaffCareServicesByStaff = async (staffId) => {
    try {
      const response = await staffCareServiceService.getAllByStaff(staffId);
      setStaffCareServices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getStaffCareServicesByStaff(staffId);
  }, [staffId, staffCareServices]);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <Row justify="start" align="middle">
        <Col>
          <Text strong style={{ fontSize: "30px" }}>
            Bakım Servislerim
          </Text>
        </Col>
        <Col style={{ marginLeft: "15px" }}>
          <Button
            onClick={() => setAddModalVisible(true)}
            type="primary"
            style={{ backgroundColor: "green" }}
          >
            Yeni Ekle
          </Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "15px" }}>
        <Col span={24}>
          {staffCareServices ? (
            <>
              <Table columns={serviceColumns} dataSource={staffCareServices} />
              {/* Edit Modal */}
              <EditStaffCareServiceModal
                visible={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                onUpdate={handleUpdateStaffCareService}
                initialValues={selectedStaffCareService}
              />
              <AddStaffCareServiceModal
                visible={addModalVisible}
                onCancel={() => setAddModalVisible(false)}
                onUpdate={handleAddStaffCareService}
                staffCareServices={staffCareServices}
              />
            </>
          ) : (
            <>Loading...</>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default StaffCareServicesPage;
