import React, { useState, useRef } from 'react';
import Switch from "react-switch";
import Sidebar from "./Sidebar";
import './all.css';
import './settings.css';

const api = {
  key: "7c89aaa1289eb1b96f07f06d82292f54",
  base: "https://api.openweathermap.org/data/2.5/"
}

const africa = ['DZ', 'AO', 'BW', 'IO', 'BI', 'CM', 'CV', 'CF', 'TD', 'KM', 'YT', 'CG', 'CD', 'BJ', 'GQ', 'ET', 'ER', 'TF', 'DJ', 'GA', 'GM', 'GH', 'GN', 'CI', 'KE', 'LS', 'LR', 'LY', 'MG', 'MW', 'ML', 'MR', 'MU', 'MA', 'MZ', 'NA', 'NE', 'NG', 'GW', 'RE', 'RW', 'SH', 'ST', 'SN', 'SC', 'SL', 'SO', 'ZA', 'ZW', 'SS', 'SD', 'EH', 'SZ', 'TG', 'TN', 'UG', 'EG', 'TZ', 'BF', 'ZM'];
const asia = ['AF', 'AZ', 'BH', 'BD', 'AM', 'BT', 'BN', 'MM', 'KH', 'LK', 'CN', 'TW', 'CX', 'CC', 'CY', 'GE', 'HK', 'IN', 'ID', 'IR', 'IQ', 'IL', 'JP', 'KZ', 'JO', 'KP', 'KR', 'KW', 'KG', 'LA', 'LB', 'MO', 'MY', 'MV', 'MN', 'OM', 'NP', 'PK', 'PS', 'PH', 'TL', 'QA', 'RU', 'SA', 'SG', 'VN', 'SY', 'TJ', 'TH', 'AE', 'TR', 'TM', 'EG', 'UZ', 'YE', 'XD', 'XS'];
const europe = ['AL', 'AD', 'AZ', 'AT', 'AM', 'BE', 'BA', 'BG', 'BY', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FO', 'FI', 'AX', 'FR', 'GE', 'DE', 'GI', 'GR', 'VA', 'HU', 'IS', 'IE', 'IT', 'KZ', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MC', 'MD', 'ME', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SM', 'RS', 'SK', 'SI', 'ES', 'SJ', 'SE', 'CH', 'TR', 'UA', 'MK', 'GB', 'GG', 'JE', 'IM'];
const northamerica = ['AG', 'BS', 'BB', 'BM', 'BZ', 'VG', 'CA', 'KY', 'CR', 'CU', 'DM', 'DO', 'SV', 'GL', 'GD', 'GP', 'GT', 'HT', 'HN', 'JM', 'MQ', 'MX', 'MS', 'CW', 'AW', 'SX', 'BQ', 'NI', 'UM', 'PA', 'PR', 'BL', 'KN', 'AI', 'LC', 'MF', 'PM', 'VC', 'TT', 'TC', 'US', 'VI'];
const oceania = ['AS', 'AU', 'SB', 'CK', 'FJ', 'PF', 'KI', 'GU', 'NR', 'NC', 'VU', 'NZ', 'NU', 'NF', 'MP', 'UM', 'FM', 'MH', 'PW', 'PG', 'PN', 'TK', 'TO', 'TV', 'WF', 'WS', 'XX'];
const southamerica = ['AR', 'BO', 'BR', 'CL', 'CO', 'EC', 'FK', 'GF', 'GY', 'PY', 'PE', 'SR', 'UY', 'VE'];

const metricBoundary = 10;
const imperialBoundary = 50;

function Settings() {

  const [query, setQuery] = useState('');
  const [requireReload, setReload] = useState(false);

  var city = localStorage.getItem("city");
  var units = localStorage.getItem("units");

  var degreeSymbol = '';
  if (units === "metric") {degreeSymbol = 'C';}
  if (units === "imperial") {degreeSymbol = 'F';}

  const search = evt => {
    if (evt.key === "Enter"){
      localStorage.setItem("city", query);
      fetch (`${api.base}weather?q=` + query + `&units=` + units + `&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          localStorage.setItem("bgClass", GenerateBGClass(result));
          setReload(true);
        })
      setQuery('');
    }
  }

  if (requireReload === true){window.location.reload()}

  return(
    <div className={localStorage.getItem("bgClass")}>
    <Sidebar/>
      <main>
        <div className="location-box">
          <div className="location">{city}</div>
        </div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder = "Search City"
            onChange = {e => setQuery(e.target.value)}
            value = {query}
            onKeyPress = {search}
          />
        </div>
        <hr></hr>
        <div className="unit-buttons">
          <label className="unit-label">Units:</label>
          <button className={GenerateButtonClass(units, "c")} onClick={() => {ChangeUnits("metric")}}>°C</button>
          <button className={GenerateButtonClass(units, "f")} onClick={() => {ChangeUnits("imperial");}}>°F</button>
        </div>
      </main>
    </div>
  );
}

function ChangeUnits(unit) {
  localStorage.setItem("units", unit);
  window.location.reload();
}

function Continent(weather) {
  var continent = ''
  var count = 0;
  while (count <= southamerica.length){
    if (southamerica[count] == weather.sys.country){
      return 'southamerica'
    }
    else{
      count += 1;
    }
  }
  count = 0;
  while (count <= oceania.length){
    if (oceania[count] == weather.sys.country){
      return 'oceania'
    }
    else{
      count += 1;
    }
  }
  count = 0;
  while (count <= northamerica.length){
    if (northamerica[count] == weather.sys.country){
      return 'northamerica'
    }
    else{
      count += 1;
    }
  }
  count = 0;
  while (count <= asia.length){
    if (asia[count] == weather.sys.country){
      return 'asia'
    }
    else{
      count += 1;
    }
  }
  count = 0;
  while (count <= europe.length){
    if (europe[count] == weather.sys.country){
      return 'europe'
    }
    else{
      count += 1;
    }
  }
  count = 0;
  while (count <= africa.length){
    if (africa[count] == weather.sys.country){
      return 'africa'
    }
    else{
      count += 1;
    }
  }
  count = 0;
}

function DayOrNight(weather) {
  const userDate = (Date.now()/1000);
  const localDate = userDate + weather.timezone
  if (localDate > (weather.sys.sunrise + weather.timezone) && localDate < (weather.sys.sunset + weather.timezone)){return 'day'}
  else{return 'night'}
}

function HotOrCold(weather) {
  var boundary = 0;
  if (localStorage.getItem("units") === 'metric') {boundary = metricBoundary;}
  if (localStorage.getItem("units") === 'imperial') {boundary = imperialBoundary;}
  if (weather.main.temp < boundary){return 'cold'}
  else {return 'hot'}
}

function GenerateBGClass(weather) {
  const continent = Continent(weather);
  const dayornight = DayOrNight(weather);
  const hotorcold = HotOrCold(weather);
  const name = continent + dayornight + hotorcold;
  return name
}

function GenerateButtonClass(units, corf) {
  if (corf == "c") {
    if (units == "metric") {
      return "selected"
    }
    else if (units == "imperial" || typeof units == undefined) {
      return "notselected"
    }
  }
 if (corf == "f") {
    if (units == "imperial") {
      return "selected"
    }
    else if (units == "metric" || typeof units == undefined) {
      return "notselected"
    }
  }
}

export default Settings;
