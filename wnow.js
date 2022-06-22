#!/usr/bin/env node

const cprl = require('caporal');
const fetch = require('node-fetch');
const fs = require('fs');
const chalk = require('chalk');
const Table = require('cli-table');
const {isValidCoords} = require('./utils');


const prgVersion = 0.2;
cprl.version(prgVersion);

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

const fetchCurrWeather = (lat,long) =>{
  let url = `https://api.open-meteo.com/v1/forecast?latitude=${parseFloat(lat)}&longitude=${parseFloat(long)}&current_weather=true`;
  return fetch(url).then((res)=>res.json());
}

cprl
.action((args,options)=>{
  let str=""
  let coords = [];
  fs.readFile('./coords', 'utf8', function(err, data){
    if(err){
      let table = new Table();
      table.push([chalk.red.bold(`No co-ordinates found! , use `) + chalk.red.bold("'wnow set <latitude> <longitude>'")]);
      console.log(table.toString());
      return;
    }
    str = str.concat(data);
    coords = str.split(' ');

    fetchCurrWeather(coords[0],coords[1]).then(apiData=>{
      let table = new Table({
          head:[chalk.white.bold('Temperature'),chalk.white.bold('Wind Speed'),chalk.white.bold('Wind Direction'),chalk.white.bold('Weather')]
        });
        let wcode = weatherCodes[apiData.current_weather.weathercode];
        table.push(
            [chalk.yellow.bold(`${apiData.current_weather.temperature}°C`),chalk.yellow.bold(`${apiData.current_weather.windspeed} km/h`),chalk.yellow.bold(`${apiData.current_weather.winddirection}°`) ,chalk.yellow.bold(`${wcode}`)]
          );
          console.log("");
          console.log(chalk.bold(table.toString()));
    });
  });

});

cprl
.command('set','Set Latitude and Longitude')
.argument('<latitude>' ,'Specify Latitude')
.argument('<longitude>' ,'Specify Longitude')
.action((args,options)=>{

  if (isValidCoords(args.latitude , args.longitude)){
    let content = `${args.latitude} ${args.longitude}`;
    fs.writeFile("./coords", content, function(err) {
      if(err) {
        return console.log(err);
      }
      let table = new Table({
        head:[chalk.white.bold('Latitude'),chalk.white.bold('Longitude')]
      });
      table.push([chalk.yellow.bold(`${args.latitude}`) , chalk.yellow.bold(`${args.longitude}`)]);
      console.log(table.toString());
    });
  }
  else{
    let table = new Table();
    table.push([chalk.red.bold('Bad values , please give numeric values greater than one!')]);
    console.log(table.toString());
    return;
  }

});


cprl
.command('credits','Show credits and Attributions')
.action(()=>{
  let table = new Table();
  table.push([chalk.yellow.bold(`wnow v${prgVersion} by harvygr8 , `) + chalk.yellow.bold(`weather data fetched using the open-meteo API`)]);
  console.log(table.toString());
})

cprl.parse(process.argv);

module.exports = {isValidCoords};
