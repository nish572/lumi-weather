import React, { useState, useEffect } from 'react';
import { countries, regions } from 'country-data';
import './home.css';
import Sidebar from "./Sidebar";

const api = {
  key: "7c89aaa1289eb1b96f07f06d82292f54",
  base: "https://api.openweathermap.org/data/2.5/"
}

const metricBoundary = 10;
const imperialBoundary = 50;

function Detailed() {

  var units = localStorage.getItem("units");
  var city = localStorage.getItem("city");

  var degreeSymbol = '';
  if (units === "metric") {degreeSymbol = 'C';}
  if (units === "imperial") {degreeSymbol = 'F';}

  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch (`${api.base}weather?q=` + city + `&units=` + units + `&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => setWeather(result))
  },[setWeather]);

  return (
    <div className={localStorage.getItem("bgClass")}>
    <Sidebar/>
      <main>
        {(typeof weather.main != "undefined") ? (
        <div className="info-container">
        </div>
        ) : ('')}
      </main>
    </div>
  )
}

function SunTime(time) {
  var utcSeconds = time;
  var d = new Date(0);
  d.setUTCSeconds(utcSeconds);
  return String(d)
}

export default Detailed;
