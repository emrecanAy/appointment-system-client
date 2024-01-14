import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "antd";
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
import CustomerService from "../api/CustomerService.ts";
import AppointmentService from "../api/AppointmentService.ts";
import StatsCard from "./statistics/StatsCard";
Chart.register(ArcElement);
Chart.register(CategoryScale);
Chart.register(LinearScale);
Chart.register(PointElement);
Chart.register(LineElement);
Chart.register(BarElement);

/* SERVICES */
const customerService = new CustomerService();
const appointmentService = new AppointmentService();

const StatisticsPage = () => {
  const [customers, setCustomers] = useState([]);
  const [waitingAndAcceptedAppointments, setWaitingAndAcceptedAppointments] =
    useState([]);
  const [cancelledAppointments, setCancelledAppointments] = useState([]);

  /* REQUESTS */
  const getAllCustomers = async () => {
    try {
      const response = await customerService.getAllCustomers();
      setCustomers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllWaitingAndAcceptedAppointments = async () => {
    try {
      const response =
        await appointmentService.getAllAcceptedAndWaitingAppointments();
      setWaitingAndAcceptedAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCancelledAppointments = async () => {
    try {
      const response = await appointmentService.getAllCancelledAppointments();
      setCancelledAppointments(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  /* CALCULATIONS */
  const calculateTotalEarnings = () => {
    let totalEarning = 0;
    waitingAndAcceptedAppointments.forEach((appointment) => {
      appointment.staffCareServices.forEach((staffCareService) => {
        totalEarning += parseInt(staffCareService.careServicePrice);
      });
    });
    return totalEarning;
  };

  const calculateCancelledAppointmentsPercentage = () => {
    const result =
      (cancelledAppointments.length / waitingAndAcceptedAppointments.length) *
      100;
    return result.toFixed(1);
  };

  /* USE EFFECTS */
  useEffect(() => {
    getAllCustomers();
    getAllWaitingAndAcceptedAppointments();
    getAllCancelledAppointments();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={6}>
          <StatsCard
            title={"Toplam Kullanıcı"}
            value={customers.length}
            type={"totalcustomers"}
          />
        </Col>
        <Col span={6}>
          <StatsCard
            title={"Toplam Randevu Sayısı"}
            value={waitingAndAcceptedAppointments.length}
            type={"totalappointments"}
          />
        </Col>
        <Col span={6}>
          <StatsCard
            title={"Toplam Kazanç"}
            value={calculateTotalEarnings()}
            type={"totalearnings"}
            suffix="₺"
          />
        </Col>
        <Col span={6}>
          <StatsCard
            title={"Randevu İptal Oranı"}
            value={calculateCancelledAppointmentsPercentage()}
            type={"totalCancelledAppointmentsByCustomer"}
            suffix={"%"}
          />
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={8}>
          <Card title="En Popüler Personeller">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, maxWidth: "50%" }}>
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
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <ul>
                  <li>Şaban Dönmez</li>
                  <li>Şenol Şen</li>
                  <li>Emrecan Ay</li>
                  <li>Mustafa Kaya</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
        <Card title="En Popüler Hizmetler">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, maxWidth: "50%" }}>
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
                        data: [27, 4, 12, 16, 1, 1],
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
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <ul>
                  <li>Saç Boyama</li>
                  <li>Keratin Bakımı</li>
                  <li>Manikür</li>
                  <li>Pedikür</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
        <Col span={8}>
        <Card title="En Çok İzin Alanlar">
            <div style={{ display: "flex", alignItems: "center" }}>
              <div style={{ flex: 1, maxWidth: "50%" }}>
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
              <div style={{ flex: 1, maxWidth: "50%" }}>
                <ul>
                  <li>Şaban Dönmez</li>
                  <li>Şenol Şen</li>
                  <li>Emrecan Ay</li>
                  <li>Mustafa Kaya</li>
                </ul>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: "20px" }}>
        <Col span={24}>
          <Card title="Müşteri Artış Oranı">
            {/* Buraya istediğiniz başka istatistikler ekleyebilirsiniz */}
            <Line
              data={{
                labels: [
                  "Ocak",
                  "Şubat",
                  "Mart",
                  "Nisan",
                  "Mayıs",
                  "Haziran",
                  "Temmuz",
                  "Ağustos",
                  "Eylül",
                  "Ekim",
                  "Kasım",
                  "Aralık",
                ],
                datasets: [
                  {
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3, 7, 15, 13, 25, 30, 35],
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
          <Card title="Günlük Ziyaretçi">
            {/* Gümlük ziyaretçi olabilir */}
            <Bar
              data={{
                labels: [
                  "Pazartesi",
                  "Salı",
                  "Çarşamba",
                  "Perşembe",
                  "Cuma",
                  "Cumartesi",
                  "Pazar",
                ],
                datasets: [
                  {
                    label: "# of votes",
                    data: [12, 19, 3, 5, 2, 3, 8],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.3)",
                      "rgba(54, 162, 235, 0.3)",
                      "rgba(255, 206, 86, 0.3)",
                      "rgba(75, 192, 192, 0.3)",
                      "rgba(153, 102, 255, 0.3)",
                      "rgba(255, 159, 64, 0.3)",
                      "rgba(255, 65, 85, 0.3)",
                    ],
                    borderColor: [
                      "rgba(255, 99, 132, 1)",
                      "rgba(54, 162, 235, 1)",
                      "rgba(255, 206, 86, 1)",
                      "rgba(75, 192, 192, 1)",
                      "rgba(153, 102, 255, 1)",
                      "rgba(255, 159, 64, 1)",
                      "rgba(255, 65, 85, 1)",
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
