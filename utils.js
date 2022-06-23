
const fetch = require('node-fetch');


const fetchCurrWeather = (key,location) =>{
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${key}`;
  return fetch(url)
  .then((res)=>{
    if(res.ok){
      return res.json();
    }
    throw Error(res.statusText);
  });
}

//deprecated
const isValidCoords = (lat,long) =>{
  if(isNaN(lat) || isNaN(long)){
    return false;
  }
  else if(parseFloat(lat)<-90 || parseFloat(lat)>90 || parseFloat(long)<-180 || parseFloat(long)>180){
    return false;
  }
  return true;
}




module.exports={fetchCurrWeather , isValidCoords}
