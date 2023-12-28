import { Button, Card } from "antd";

function ServiceCard({ id, title, description, image }) {
  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleEdit = (id) => {
    console.log(id, "Düzenlendi!");
  };

  const handleDelete = (id) => {
    console.log(id, "Silindi");
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
          type="primary"
          style={{ backgroundColor: "orange" }}
          onClick={() => handleEdit(id)}
        >
          Düzenle
        </Button>
        <Button
          type="primary"
          style={{ backgroundColor: "firebrick" }}
          onClick={() => handleDelete(id)}
        >
          Sil
        </Button>
      </div>
    </Card>
  );
}

export default ServiceCard;
