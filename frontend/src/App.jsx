import { useState, useEffect } from 'react'
import axios from "axios";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


import './App.css'
import TemperatureHumidityChart from "./component/Chart.jsx";
import {BASEURL} from "./utils/constant.js";

function App() {
    const [stepCount, setStepCount] = useState(0);
    const [humidity, setHumidity] = useState(0);
    const [temperature, settemperature] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);
    const percentage = 66;
    // Fetch step count data from server http://localhost:4000/tempdata
    const fetchStepCount = async () => {
        try {
            //const response = await axios.get('https://adsds-d13a7574abf3.herokuapp.com/stepsdata');
            const response = await axios.get('{BASEURL}/stepsdata');

            console.log("Response=>",response.data);
            console.log("Response=>",response);
            setStepCount(response.data.data.humidity);
            setLastUpdated(response.data.data.lastUpdatedTimestamp);
        } catch (error) {
            console.error('Error fetching step count data:', error);
        }
    };
    const fetchTempData = async () => {
        try {
            //const response = await axios.get('https://adsds-d13a7574abf3.herokuapp.com/tempdata');
             const response = await axios.get(`${BASEURL}/tempdata`);
            console.log("Response=>",response.data[0].humidity);
            setHumidity(response.data[0].humidity);
            settemperature(response.data[0].temperature)
            setLastUpdated(response.data[0].lastUpdatedTimestamp);
        } catch (error) {
            console.error('Error fetching step count data:', error);
        }
    };


    useEffect(() => {
        // Fetch initial step count data
      //  fetchStepCount();
        fetchTempData();

        // Poll for new data every 5 seconds
        const interval = setInterval(() => {
            fetchTempData();
        }, 1000);

        return () => clearInterval(interval);
    }, []);
  return (
      <div className={"flex lg:flex-col flex-col lg:gap-10 items-center justify-center min-h-screen w-screen  bg-[#003C43] "}>
          <div className={"flex justify-center items-center flex-col   gap-5 "}>
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

              <div className={"w-full bg-[#E3FEF7]"}>
                  <TemperatureHumidityChart/>
              </div>

          </div>

      </div>
  )
}

export default App
