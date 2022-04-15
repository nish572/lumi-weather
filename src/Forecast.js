import React, { useState, useEffect } from 'react';
import './all.css';
import './forecast.css';
import Sidebar from "./Sidebar";

const forecastApi = {
  key: "7c89aaa1289eb1b96f07f06d82292f54",
  base: "https://api.openweathermap.org/data/2.5/onecall"
}

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function Forecast() {
  const [forecast, setForecast] = useState({});

  var units = localStorage.getItem("units");
  var city = localStorage.getItem("city");

  var degreeSymbol = '';
  if (units === "metric") {degreeSymbol = 'C';}
  if (units === "imperial") {degreeSymbol = 'F';}

  useEffect(() => {
    fetch (`${forecastApi.base}?lat=` + Math.round(localStorage.getItem("latitude")) + `&lon=` + Math.round(localStorage.getItem("longitude"))  + `&units=` + units + `&APPID=${forecastApi.key}`)
      .then(res => res.json())
      .then(result => setForecast(result))
  },[setForecast]);

  return(
    <div className={localStorage.getItem("bgClass")}>
    <Sidebar/>
      <main>
        {(typeof forecast.main != "undefined") ? (
        <div className="info-container">
          <div className="location-box">
            <div className="location"></div>
          </div>
          <div className="temp-box">
            <div className="temperature"></div>
          </div>
          <div className="precipitation-box">
            <div className="precipitation">
            </div>
          </div>
          <div className="realfeel-box">
            <div className="realfeel"></div>
          </div>
        </div>
        ) : (
        <div className="location-box">
          <div className="location">{city}</div>
        </div>
      )}
      </main>
    </div>
  );
}

export default Forecast
