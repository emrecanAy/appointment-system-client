import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const NotFoundPage = () => (
  <Result
    status="404"
    title="404"
    subTitle="Üzgünüz, ziyaret ettiğiniz sayfa mevcut değil."
    extra={<Link to={"/"}><Button type="primary">Anasayfaya Dön</Button></Link>}
  />
);
export default NotFoundPage;