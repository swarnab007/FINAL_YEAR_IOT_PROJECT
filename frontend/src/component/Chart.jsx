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
        fetchData('hour'); // Fetch data for the default interval (1 hour)
    }, []);

    const fetchData = async (interval) => {
        try {
            const response = await axios.get(`${BASEURL}/tempdata`);
            const data = response.data;

            // Extract timestamps, humidity, and temperature data from the response
            const labels = data.map(entry => {
                const timestamp = new Date(entry.timestamp);
                return timestamp.toLocaleString(); // Convert timestamp to localized string format
            });
            console.log(labels);// Assuming _id contains the timestamp
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

    return (
        <div className={"p-10 w-full"}>
            {/* Render two Line charts, one for humidity and one for temperature */}

            <div className={"w-full"}>

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
