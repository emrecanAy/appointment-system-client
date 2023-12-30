import { Button, Card, Popconfirm, message } from "antd";
import CareServiceService from "../../api/CareServiceService.ts";

function ServiceCard({ careServiceId, careServiceName, careServiceDescription, imagePath, onEditClick }) {

  //Service
  const careServiceService = new CareServiceService();

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleEdit = (id) => {
    onEditClick(careServiceId, careServiceName, careServiceDescription, imagePath);
  };

  const onDeleteConfirm = async (e) => {
    const response = await careServiceService.deleteCareService({careServiceId, careServiceName, careServiceDescription, imagePath});
    console.log(response);
    message.success(`${careServiceName} silindi!`);
  };
  const onDeleteCancel = (e) => {
    console.log(e);
    message.error('İptal edildi!');
  };

  return (
    <Card
      hoverable
      style={{ width: "100%", maxWidth: "300px", margin: "16px" }} // Adjusted width to be responsive
      cover={
        <img
          alt={careServiceName}
          src={imagePath}
          style={{ objectFit: "cover", width: "100%", height: "150px" }}
        />
      }
    >
      <Card.Meta title={careServiceName} description={truncateDescription(careServiceDescription)} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "8px",
        }}
      >
        <Button
          id="edit"
          type="primary"
          style={{ backgroundColor: "orange" }}
          onClick={() => handleEdit(careServiceId)}
        >
          Düzenle
        </Button>

        <Popconfirm
          title="Sil"
          description="Silmek istediğinize emin misiniz?"
          onConfirm={onDeleteConfirm}
          onCancel={onDeleteCancel}
          okText="Evet"
          cancelText="İptal"
        >
          <Button
            id="delete"
            type="primary"
            style={{ backgroundColor: "firebrick" }}
          >
            Sil
          </Button>
        </Popconfirm>
      </div>
    </Card>
  );
}

export default ServiceCard;
