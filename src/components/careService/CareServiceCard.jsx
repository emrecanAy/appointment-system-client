import { Button, Card, Popconfirm, message } from "antd";

function ServiceCard({ id, title, description, image, onEditClick }) {
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleEdit = (id) => {
    onEditClick(id, title, description, image);
  };

  const onDeleteConfirm = (e) => {
    console.log(e);
    message.success(`Id:${id} olan veri silindi!`);
  };
  const onDeleteCancel = (e) => {
    console.log(e);
    message.error('Click on No');
  };

  return (
    <Card
      hoverable
      style={{ width: "100%", maxWidth: "300px", margin: "16px" }} // Adjusted width to be responsive
      cover={
        <img
          alt={title}
          src={image}
          style={{ objectFit: "cover", width: "100%", height: "150px" }}
        />
      }
    >
      <Card.Meta title={title} description={truncateDescription(description)} />
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
          onClick={() => handleEdit(id)}
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
