import React from 'react';
import { Card, List, Avatar, Button } from 'antd';

const careServices = [
  {
    id: 1,
    title: 'Saç Bakımı',
    description: 'Saçlarınız için özel bakım hizmeti.',
    image: 'https://i.nefisyemektarifleri.com/2023/02/27/evde-en-iyi-sac-bakimi-nasil-yapilir-9-ipucu.jpg',
  },
  {
    id: 2,
    title: 'Keratin Bakımı',
    description: 'Keratin ile saçlarınıza canlılık kazandırın.',
    image: 'https://blog.watsons.com.tr/wp-content/uploads/keratin-bakimi-1-1024x614.jpg',
  },
  {
    id: 3,
    title: 'Tırnak Bakımı',
    description: 'Tırnaklarınıza özen gösterin.',
    image: 'https://i.nefisyemektarifleri.com/2022/10/18/evde-tirnak-bakimi-nasil-yapilir-9-dogal-yontem-13.jpg',
  },
  {
    id: 4,
    title: 'Saç Boyama',
    description: 'Farklı renklerle saçlarınıza yeni bir görünüm kazandırın.',
    image: 'https://www.instyle.com.tr/wp-content/uploads/2023/01/sac-boyamak-ile-ilgili-bilinmesi-gerekenler-92903-25112015095055.jpg',
  },
  {
    id: 5,
    title: 'Kalıcı Makyaj',
    description: 'Kalıcı makyaj ile güzellikte sınır tanımayın.',
    image: 'https://www.mayaakademi.com.tr/wp-content/uploads/2020/01/kalici-makyaj-avantajlari.jpg',
  },
  {
    id: 6,
    title: 'Cilt Bakımı',
    description: 'Cildinizi sağlıklı ve genç tutmak için özel cilt bakımı.',
    image: 'https://heraderma.com/wp-content/uploads/2021/11/medikalciltbakimi-1170x700.jpg',
  },
  {
    id: 7,
    title: 'Manikür ve Pedikür',
    description: 'Elleriniz ve ayaklarınız için profesyonel manikür ve pedikür hizmetleri.',
    image: 'https://elifdincarslanpoliklinigi.com/wp-content/uploads/2023/07/manikur-pedikur-elif-dincarslan.jpg',
  },
  {
    id: 8,
    title: 'Göz Makyajı',
    description: 'Gözlerinizi ön plana çıkarmak için uzman dokunuşlu göz makyajı.',
    image: 'https://static.ticimax.cloud/30692/Uploads/Blog/Kusursuz-Goz-Makyaji-805a.jpg',
  }
  
];

const ServiceCard = ({ title, description, image }) => (
  <Card
    hoverable
    style={{ width: 300, margin: '16px' }}
    cover={<img alt={title} src={image} style={{ objectFit: 'cover', width: '100%', height: '150px' }}/>}
  >
    <Card.Meta title={title} description={description} />
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
      <Button >Düzenle</Button>
      <Button danger>Sil</Button>
    </div>
  </Card>
);

const ServiceList = () => (
  <List
    grid={{ gutter: 16, column: 4 }}
    dataSource={careServices}
    renderItem={(service) => (
      <List.Item key={service.id}>
        <ServiceCard
          title={service.title}
          description={service.description}
          image={service.image}
        />
      </List.Item>
    )}
  />
);

const TestCareService = () => (
  <div style={{ padding: '24px' }}>
    <h1>Bakım Servisleri</h1>
    <Button type="primary" onClick={() => null}>
      Ekle
    </Button>
    <ServiceList />
  </div>
);

export default TestCareService;
