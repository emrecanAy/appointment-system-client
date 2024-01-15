import React, { useState } from "react";
import {
  Table,
  Input,
  Button,
  Layout,
  Tooltip,
  message,
  Popconfirm,
  Form,
  Modal,
  DatePicker,
  TimePicker,
  Typography,
  Row,
  Col,
} from "antd";
import { EditOutlined, CloseOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
import { useEffect } from "react";
import moment from "moment";
import { useParams } from "react-router-dom";
import PermissionService from "../../api/PermissionService.ts";
import AddPermissionModal from "./AddPermissionModal.jsx";
const { Text } = Typography;

const permissionService = new PermissionService();

const StaffPermissionOperationsPage = () => {
  const [permissions, setPermissions] = useState(null);
  const [searchedText, setSearchedText] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [addModalVisible, setAddModelVisible] = useState(false);
  const [formData, setFormData] = useState({});
  const [form] = Form.useForm();

  const { staffId } = useParams();

  const getAllPermissionsByStaff = async (staffId) => {
    try {
      const response = await permissionService.getAllByStaff(staffId);
      sortData(response.data);
      setPermissions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createPermission = async (values) => {
    try {
      await permissionService.createPermission(values);
      message.success(
        "İzin talebi oluşturuldu. Tablodan durumunu takip edebilirsiniz."
      );
      onAddModalCancel();
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (record) => {
    const { permissionDate, permissionStartHour, permissionEndHour, ...rest } =
      record;

    const formattedRecord = {
      ...rest,
      permissionDate: moment(permissionDate).format("YYYY/MM/DD"),
      permissionStartHour: moment(permissionStartHour, "HH:mm"),
      permissionEndHour: moment(permissionEndHour, "HH:mm"),
    };

    //setFormData(formattedRecord);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleFormSubmit = async (values) => {
    try {
      const response = await permissionService.updatePermission(
        formData.id,
        values
      );
      getAllPermissionsByStaff(staffId);
      console.log(response);
      message.success("İzin güncellendi.");
      setIsModalVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onAddModalCancel = () => {
    setAddModelVisible(false);
  };

  const sortData = (permissions) => {
    permissions.sort((a, b) => {
      const dateA = new Date(
        a.permissionDate[0],
        a.permissionDate[1] - 1,
        a.permissionDate[2]
      );
      const dateB = new Date(
        b.permissionDate[0],
        b.permissionDate[1] - 1,
        b.permissionDate[2]
      );

      return dateB - dateA;
    });
  };

  const onAddModalUpdate = async (values) => {
    setAddModelVisible(true);
  };

  const handleDeletePermission = async (record) => {
    try {
      await permissionService.deletePermission(record);
      message.error("İzin silindi!");
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    {
      title: "İzin Tarihi",
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
    {
      title: "Gerekçe",
      dataIndex: "permissionReason",
      key: "permissionReason",
      onFilter: (value, record) => {
        return (
          String(record.staff.firstName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.staff.lastName)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.permissionReason)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        );
      },
      filteredValue: [searchedText],
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return <p>{record.status}</p>;
      },
      filters: [
        { text: "WAITING", value: "WAITING" },
        { text: "ACCEPTED", value: "ACCEPTED" },
        { text: "DECLINED", value: "DECLINED" },
        { text: "CANCELLED", value: "CANCELLED" },
      ],
      onFilter: (value, record) => {
        return record.status === value;
      },
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Tooltip title="Düzenle">
            <Button
              id="editButton"
              type="primary"
              onClick={() => showModal(record)}
              icon={<EditOutlined />}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Sil">
            <Popconfirm
              title="Silmek istediğinize emin misiniz?"
              okText="Evet"
              cancelText="İptal"
              onConfirm={() => handleDeletePermission(record)}
            >
              <Button
                type="danger"
                icon={<CloseOutlined />}
                style={{
                  marginRight: 8,
                  backgroundColor: "firebrick",
                  color: "white",
                }}
              />
            </Popconfirm>
          </Tooltip>
        </>
      ),
    },
  ];

  const formatPermissionDate = (dateString) => {
    const formattedDate = moment(dateString, "YYYYMMDDHHmmssSSS")
      .locale("tr")
      .format("YYYY-MM-DD HH:mm:ss");
    return formattedDate;
  };

  const formatPermissionHour = (hourString) => {
    const formattedHour = moment(hourString, "HHmm").format("HH:mm");
    return formattedHour;
  };

  useEffect(() => {
    getAllPermissionsByStaff(staffId);
  }, [staffId, permissions]);

  return (
    <Layout style={{ padding: "24px" }}>
      <Row justify="start" align="middle">
        <Col>
          <Text strong style={{ fontSize: "30px" }}>
            İzin Taleplerim
          </Text>
        </Col>
        <Col style={{ marginLeft: "15px" }}>
          <Button
            onClick={onAddModalUpdate}
            type="primary"
            style={{ backgroundColor: "green" }}
          >
            Yeni İzin Talep Et
          </Button>
        </Col>
      </Row>
      <Content
        style={{
          padding: "24px",
          display: "initial",
          justifyContent: "center",
        }}
      >
        <Input.Search
          placeholder="Arama yap..."
          style={{ marginBottom: 8 }}
          onSearch={(value) => setSearchedText(value)}
          onChange={(e) => setSearchedText(e.target.value)}
        />
        <Table columns={columns} dataSource={permissions} />
      </Content>
      <Modal
        title="İzin Güncelle"
        open={isModalVisible}
        onCancel={handleCancel}
        onOk={() => form.submit()}
      >
        <Form form={form} onFinish={handleFormSubmit} initialValues={formData}>
          <Form.Item name="permissionDate" label="İzin Tarihi">
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item name="permissionStartHour" label="Başlangıç Saati">
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="permissionEndHour" label="Bitiş Saati">
            <TimePicker format="HH:mm" />
          </Form.Item>
          <Form.Item name="permissionReason" label="Gerekçe">
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Güncelle
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <AddPermissionModal
        addModalVisible={addModalVisible}
        onAddModalCancel={onAddModalCancel}
        onAddModalUpdate={onAddModalUpdate}
        handleAdd={createPermission}
      />
    </Layout>
  );
};

export default StaffPermissionOperationsPage;
