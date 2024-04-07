import { useState, useEffect } from 'react'
import axios from "axios";


import './App.css'

function App() {
    const [stepCount, setStepCount] = useState(0);
    const [lastUpdated, setLastUpdated] = useState(null);

    // Fetch step count data from server
    const fetchStepCount = async () => {
        try {
            const response = await axios.get('https://git.heroku.com/iot.git/stepsdata');
            console.log("Response=>",response);
            setStepCount(response.data.data.steps);
            setLastUpdated(response.data.data.lastUpdatedTimestamp);
        } catch (error) {
            console.error('Error fetching step count data:', error);
        }
    };

    useEffect(() => {
        // Fetch initial step count data
        fetchStepCount();

        // Poll for new data every 5 seconds
        const interval = setInterval(() => {
            fetchStepCount();
        }, 5000);

        return () => clearInterval(interval);
    }, []);
  return (
      <div className={"flex flex-row gap-10 items-center justify-center min-h-screen w-screen  bg-[#003C43] "}>
          <div className={"p-10 flex flex-col items-start text-white text-[30px] justify-center  rounded-2xl"}>
              <p >Team</p>
              <p>Circuit Bruster</p>
          </div>
          <div className={"p-10 bg-[#77B0AA] text-black rounded-2xl"}>
              <div className={" flex flex-col gap-2 items-center"}>
                  <h2 className={" font-bold"}>Step Count: </h2>
                     <p className={"text-[30px]"}>{stepCount}</p>
                  <p className={"text-[15px]"}>Last Updated:</p>
                  <p className={"text-[15px]"}> {lastUpdated ? new Date(lastUpdated).toLocaleString() : 'N/A'}</p>
              </div>
          </div>
      </div>
  )
}

export default App
