import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {BASEURL} from "../utils/constant.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Humidity & Temperature',
        },
    },
};

function TemperatureHumidityChart() {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASEURL}/tempdata`);
                const data = response.data;
                console.log(data);
                // Extract timestamps, humidity, and temperature data from the response
                const labels = data.map(entry => {
                    const timestamp = new Date(entry.timestamp);
                    return timestamp.toLocaleString(); // Convert timestamp to localized string format
                });
                const humidityData = data.map(entry => entry.humidity);
                const temperatureData = data.map(entry => entry.temperature);

                // Set up chart data
                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: 'Humidity',
                            data: humidityData,
                            borderColor: 'blue',
                            fill: false,
                            yAxisID: 'humidity-axis'
                        },
                        {
                            label: 'Temperature',
                            data: temperatureData,
                            borderColor: 'red',
                            fill: false,
                            yAxisID: 'temperature-axis'
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching chart data:', error);
            }
        };

        fetchData(); // Fetch data initially

        const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

        // Cleanup function to clear interval
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"p-10 w-full flex items-center justify-center"}>
            {/* Render two Line charts, one for humidity and one for temperature */}
            <div style={{ width: '60%', backgroundColor: "#E3FEF7", display: "flex", justifyContent: "center", justifyItems: "center" }}>
                <Line options={options} data={{
                    labels: chartData.labels,
                    datasets: [{
                        label: 'Temperature',
                        data: chartData.datasets ? chartData.datasets[1].data : [],
                        borderColor: 'blue',
                        fill: false,
                        yAxisID: 'temperature-axis'
                    },
                        {
                            label: 'Humidity',
                            data: chartData.datasets ? chartData.datasets[0].data : [],
                            borderColor: 'red',
                            fill: false,
                            yAxisID: 'temperature-axis'
                        }]
                }} />
            </div>
        </div>
    );
}

export default TemperatureHumidityChart;
