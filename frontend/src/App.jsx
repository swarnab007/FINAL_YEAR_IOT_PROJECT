import React, { useState, useEffect } from 'react';
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import TemperatureHumidityChart from "./component/Chart.jsx";
import { BASEURL } from "./utils/constant.js";

function App() {
    const [stepCount, setStepCount] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [temperature, setTemperature] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [toastShown, setToastShown] = useState(false); // State to track whether toast has been shown

    const fetchTempData = async () => {
        try {
            const response = await axios.get(`${BASEURL}/tempdata`);
            console.log("Response=>", response.data[0].humidity);
            setHumidity(response.data[0].humidity);
            const newTemperature = response.data[0].temperature;
            if (!toastShown && newTemperature > 40 && newTemperature > temperature) {
                // Temperature increased from 40 and toast hasn't been shown yet
                toast.error("Temperature increased from 40!");
                setToastShown(true); // Set toastShown to true to prevent showing again
            }
            setTemperature(newTemperature);
            setLastUpdated(response.data[0].timestamp);
            console.log(response.data[0].timestamp);
        } catch (error) {
            console.error('Error fetching step count data:', error);
        }
    };

    useEffect(() => {
        // fetch temperature and humidity data
        fetchTempData();

        // Poll for new data every 7 seconds
        const interval = setInterval(() => {
            fetchTempData();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={"flex lg:flex-col flex-col lg:gap-10 items-center justify-center min-h-screen w-screen  bg-[#003C43] "}>
            <div className={"w-full flex justify-center items-center flex-col   gap-5 "}>
                <div className={"flex justify-center items-center lg:flex-row flex-col  gap-5"}>
                    <div className={"p-10 bg-[#77B0AA] text-black rounded-2xl h-full w-[50%]"}>
                        <div className={" flex flex-col gap-2 items-center h-full w-full"}>
                            <h2 className={" font-bold"}>Temperature </h2>
                            <p className={"text-[30px]"}>{temperature} <span> °</span></p>
                            <p className={"text-[15px]"}>Last Updated:</p>
                            <p className={"text-[15px]"}> {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</p>
                        </div>
                    </div>
                    <div className={" flex flex-col p-4 gap-5 w-[40%]"}>
                        <CircularProgressbar value={humidity} text={`${humidity}%`}/>
                        <p className={"text-center font-bold text-white  text-[20px]"}>Humidity</p>
                    </div>
                </div>

                <div className={"w-full "}>
                    <TemperatureHumidityChart/>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default App;
