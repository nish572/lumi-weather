import React, { useState, useEffect } from 'react';
import { countries, regions } from 'country-data';
import './all.css'
import './home.css';
import Sidebar from "./Sidebar";

const api = {
  key: "7c89aaa1289eb1b96f07f06d82292f54",
  base: "https://api.openweathermap.org/data/2.5/"
}

function Home() {

  var city = localStorage.getItem("city");
  var units = localStorage.getItem("units");

  var degreeSymbol = '';
  if (units === "metric") {degreeSymbol = 'C';}
  if (units === "imperial") {degreeSymbol = 'F';}

  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetch (`${api.base}weather?q=` + city  + `&units=` + units + `&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => setWeather(result))
  },[setWeather]);

  return (
    <div className={(typeof city === "undefined") ? ("defaulthome") : (localStorage.getItem("bgClass"))}>
    <Sidebar/>
      <main>
        {(typeof weather.main != "undefined") ? (
        <div className="info-container">
          <div className="location-box">
            <div className="location">{weather.name}, {countries[weather.sys.country].name}</div>
          </div>
          <div className="temp-box">
            <div className="temperature">{Math.round(weather.main.temp)}°</div>
          </div>
          <div className="precipitation-box">
            <div className="precipitation">
              {(typeof weather.rain === "undefined" && typeof weather.snow === "undefined" && weather.weather[0].description != 'thunderstorm') ? ('NO PRECIPITATION') : (weather.weather[0].description).toUpperCase()}
            </div>
          </div>
          <div className="realfeel-box">
            <div className="realfeel">REAL FEEL {Math.round(weather.main.feels_like)}°{degreeSymbol}</div>
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

export default Home;
