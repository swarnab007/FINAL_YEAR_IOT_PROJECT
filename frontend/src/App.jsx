import "react-circular-progressbar/dist/styles.css";
import temp from "./assets/temp.svg";
import hum from "./assets/hum.svg";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";
import "./App.css";

// Register the required components and scales
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function App() {
  const temperature = 31;
  const humidity = 38;
  const ambientLight = 51;

  const sensorData = [
    { temp: 24, hum: 70, light: 20 },
    { temp: 25, hum: 72, light: 25 },
    { temp: 26, hum: 74, light: 30 },
    { temp: 27, hum: 76, light: 35 },
    { temp: 28, hum: 78, light: 40 },
    { temp: 29, hum: 80, light: 45 },
  ];

  return (
    <div className="App">
      <div className="container">
        <h1>Sensor Dashboard For Livestock Monitoring System</h1>
        <div className="card_container topbar">
          <div className="card">
            <div className="icon">
              <img src={temp} alt="temp_icon" width="40vw" />
            </div>
            <div className="title">
              <h2>Temperature</h2>
            </div>
            <div className="value">
              <h2>{temperature}</h2>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <img src={hum} alt="hum_icon" width="40vw" />
            </div>
            <div className="title">
              <h2>Humidity</h2>
            </div>
            <div className="value">
              <h2>{humidity}</h2>
            </div>
          </div>
          <div className="card">
            <div className="icon">
              <img src={hum} alt="light_icon" width="40vw" />
            </div>
            <div className="title">
              <h2>Ambient Light</h2>
            </div>
            <div className="value">
              <h2>{ambientLight}</h2>
            </div>
          </div>
        </div>
        <div className="card_container">
          <div className="card">
            <div className="chart">
              <Line
                data={{
                  labels: [1, 2, 3, 4, 5, 6],
                  datasets: [
                    {
                      label: "Temperature",
                      data: sensorData.map((sensor) => sensor.temp),
                      backgroundColor: "rgba(54, 162, 235, 0.2)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                      fill: true,
                    },
                  ],
                }}
                height={250}
                options={{
                  responsive: true,
                  responsiveAnimationDuration: 400,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="chart">
              <Bar
                data={{
                  labels: [1, 2, 3, 4, 5, 6],
                  datasets: [
                    {
                      label: "Humidity",
                      data: sensorData.map((sensor) => sensor.hum),
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                      ],
                      borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                      ],
                      borderWidth: 1,
                    },
                  ],
                }}
                height={250}
                options={{
                  responsive: true,
                  responsiveAnimationDuration: 400,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
          <div className="card">
            <div className="chart">
              <Line
                data={{
                  labels: [1, 2, 3, 4, 5, 6],
                  datasets: [
                    {
                      label: "Ambient Light",
                      data: sensorData.map((sensor) => sensor.light),
                      backgroundColor: "rgba(75, 192, 192, 0.2)",
                      borderColor: "rgba(75, 192, 192, 1)",
                      borderWidth: 1,
                      fill: true,
                    },
                    {
                      label: "Temperature",
                      data: sensorData.map((sensor) => sensor.temp),
                      backgroundColor: "rgba(54, 162, 235, 0.1)",
                      borderColor: "rgba(54, 162, 235, 1)",
                      borderWidth: 1,
                      fill: true,
                    },
                  ],
                }}
                height={250}
                options={{
                  responsive: true,
                  responsiveAnimationDuration: 400,
                  maintainAspectRatio: false,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                    y: {
                      grid: {
                        display: false,
                        color: "#666",
                      },
                      ticks: {
                        color: "#999",
                      },
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <footer>
        <a href="https://www.arduino.cc/">Documentation</a>
        &nbsp;&nbsp;&nbsp;.&nbsp;&nbsp;&nbsp;
        <a href="https://www.npmjs.com/package/react-chartjs-2">Reference</a>
        <p>&copy; J C, 2023</p>
      </footer>
    </div>
  );
}

export default App;
