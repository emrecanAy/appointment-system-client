import { List } from "antd";
import React from "react";
import ServiceCard from "./CareServiceCard";

const careServices = [
  {
    id: 1,
    title: "Saç Bakımı",
    description: "Saçlarınız için özel bakım hizmeti, bakım hizmeti.",
    image:
      "https://i.nefisyemektarifleri.com/2023/02/27/evde-en-iyi-sac-bakimi-nasil-yapilir-9-ipucu.jpg",
  },
  {
    id: 2,
    title: "Keratin Bakımı",
    description: "Keratin ile saçlarınıza canlılık kazandırın, kazandırın.",
    image:
      "https://blog.watsons.com.tr/wp-content/uploads/keratin-bakimi-1-1024x614.jpg",
  },
  {
    id: 3,
    title: "Tırnak Bakımı",
    description: "Tırnaklarınıza özen gösterin, özen gösterin.",
    image:
      "https://i.nefisyemektarifleri.com/2022/10/18/evde-tirnak-bakimi-nasil-yapilir-9-dogal-yontem-13.jpg",
  },
  {
    id: 4,
    title: "Saç Boyama",
    description: "Farklı renklerle saçlarınıza yeni bir görünüm kazandırın.",
    image:
      "https://www.instyle.com.tr/wp-content/uploads/2023/01/sac-boyamak-ile-ilgili-bilinmesi-gerekenler-92903-25112015095055.jpg",
  },
  {
    id: 5,
    title: "Kalıcı Makyaj",
    description: "Kalıcı makyaj ile güzellikte sınır tanımayın.",
    image:
      "https://www.mayaakademi.com.tr/wp-content/uploads/2020/01/kalici-makyaj-avantajlari.jpg",
  },
  {
    id: 6,
    title: "Cilt Bakımı",
    description: "Cildinizi sağlıklı ve genç tutmak için özel cilt bakımı.",
    image:
      "https://heraderma.com/wp-content/uploads/2021/11/medikalciltbakimi-1170x700.jpg",
  },
  {
    id: 7,
    title: "Manikür ve Pedikür",
    description:
      "Elleriniz ve ayaklarınız için profesyonel manikür ve pedikür hizmetleri.",
    image:
      "https://elifdincarslanpoliklinigi.com/wp-content/uploads/2023/07/manikur-pedikur-elif-dincarslan.jpg",
  },
  {
    id: 8,
    title: "Göz Makyajı",
    description:
      "Gözlerinizi ön plana çıkarmak için uzman dokunuşlu göz makyajı.",
    image:
      "https://static.ticimax.cloud/30692/Uploads/Blog/Kusursuz-Goz-Makyaji-805a.jpg",
  },
  {
    id: 9,
    title: "Aromaterapi Masajı",
    description:
      "Rahatlamak ve zindelik kazanmak için özel aromaterapi masajı.",
    image:
      "https://borfiz.com.tr/wp-content/uploads/2022/09/medikal-masaj-izmir.png",
  },
  {
    id: 10,
    title: "Güzellik Uygulamaları Kursu",
    description:
      "Kendinize özel güzellik uygulamalarını öğrenmek için kurslarımızı keşfedin.",
    image:
      "https://im.haberturk.com/l/2019/09/24/ver1569343482/2525097/jpg/640x360",
  },
];

function CareServiceList({onEditClick}) {
  return (
    <List
      grid={{ gutter: 16, column: 5 }} // Adjusted column to 1 for smaller screens
      dataSource={careServices}
      renderItem={(service) => (
        <List.Item key={service.id}>
          <ServiceCard
            id={service.id}
            title={service.title}
            description={service.description}
            image={service.image}
            onEditClick={() => onEditClick(service.id, service.title, service.description, service.image)}
          />
        </List.Item>
      )}
    />
  );
}

export default CareServiceList;
