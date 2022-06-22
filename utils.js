const fetch = require('node-fetch');


const weatherCodes={
  0:'Clear Sky',
  1:'Mainly Clear',
  2:'Partly Cloudy',
  3:'Overcast',
  45:'Fog',
  51:'Light Drizzle',
  53:'Moderate Drizzle',
  55:'Dense Drizzle',
  61:'Light Rain',
  63:'Moderate Rain',
  67:'Heavy Rain',
  71:'Light Snowfall',
  73:'Moderate Snowfall',
  75:'Heavy Snowfall',
  77:'Snow grain',
  80:'Light Shower',
  81:'Moderate Shower',
  82:'Heavy Shower',
  85:'Light Snow Shower',
  86:'Heavy Snow Shower',
  95:'Thunderstorm',
  96:'Thunderstorm and Slight Hail',
  99:'Thunderstorm and Heavy Hail'
};

//add fetch error handling
const fetchCurrWeather = (lat,long) =>{
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(lat)}&longitude=${parseFloat(long)}&current_weather=true`;
  return fetch(url).then((res)=>res.json());
}

const isValidCoords = (lat,long) =>{
  if(isNaN(lat) || isNaN(long)){
    return false;
  }
  else if(parseFloat(lat)<-90 || parseFloat(lat)>90 || parseFloat(long)<-180 || parseFloat(long)>180){
    return false;
  }
  return true;
}




module.exports={weatherCodes , fetchCurrWeather , isValidCoords}
