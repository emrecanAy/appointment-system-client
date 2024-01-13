import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card, Col, Row, Statistic } from "antd";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);

const StatisticsPage = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <Statistic title="Toplam Kullanıcı" value={1000} />
              </div>
              <div>
                <UserOutlined
                  style={{ fontSize: "50px", marginRight: "8px" }}
                />
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Günlük Ziyaretçi" value={500} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Satışlar" value={150} suffix="₺" />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card title="Aylık Gelir">
            <Doughnut
              data={{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.3)",
                      "rgba(54, 162, 235, 0.3)",
                      "rgba(255, 206, 86, 0.3)",
                      "rgba(75, 192, 192, 0.3)",
                      "rgba(153, 102, 255, 0.3)",
                      "rgba(255, 159, 64, 0.3)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                  },
                ],
              }}
              height={100}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="En Çok Randevu Alan Personel">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Doughnut
                data={{
                  labels: [
                    "Red",
                    "Blue",
                    "Yellow",
                    "Green",
                    "Purple",
                    "Orange",
                  ],
                  datasets: [
                    {
                      label: "# of votes",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.3)",
                        "rgba(54, 162, 235, 0.3)",
                        "rgba(255, 206, 86, 0.3)",
                        "rgba(75, 192, 192, 0.3)",
                        "rgba(153, 102, 255, 0.3)",
                        "rgba(255, 159, 64, 0.3)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                    },
                  ],
                }}
                height={100}
                width={300}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Çalışan Kazançları">
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Doughnut
                data={{
                  labels: [
                    "Red",
                    "Blue",
                    "Yellow",
                    "Green",
                    "Purple",
                    "Orange",
                  ],
                  datasets: [
                    {
                      label: "# of votes",
                      data: [12, 19, 3, 5, 2, 3],
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.3)",
                        "rgba(54, 162, 235, 0.3)",
                        "rgba(255, 206, 86, 0.3)",
                        "rgba(75, 192, 192, 0.3)",
                        "rgba(153, 102, 255, 0.3)",
                        "rgba(255, 159, 64, 0.3)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                    },
                  ],
                }}
                height={100}
                width={300}
                options={{
                  maintainAspectRatio: false,
                  scales: {
                    yAxes: [
                      {
                        ticks: {
                          beginAtZero: true,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Aylık Gelir">
            {/* Buraya istediğiniz başka istatistikler ekleyebilirsiniz */}
            <Line
              data={{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.3)",
                      "rgba(54, 162, 235, 0.3)",
                      "rgba(255, 206, 86, 0.3)",
                      "rgba(75, 192, 192, 0.3)",
                      "rgba(153, 102, 255, 0.3)",
                      "rgba(255, 159, 64, 0.3)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                  },
                ],
              }}
              height={100}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card>
            {/* Buraya istediğiniz başka istatistikler ekleyebilirsiniz */}
            <Bar
              data={{
                labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
                datasets: [
                  {
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.3)",
                      "rgba(54, 162, 235, 0.3)",
                      "rgba(255, 206, 86, 0.3)",
                      "rgba(75, 192, 192, 0.3)",
                      "rgba(153, 102, 255, 0.3)",
                      "rgba(255, 159, 64, 0.3)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                    ],
                  },
                ],
              }}
              height={100}
              width={300}
              options={{
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default StatisticsPage;
