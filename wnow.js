#!/usr/bin/env node

const cprl = require('caporal');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const Table = require('cli-table');
const {weatherCodes , fetchCurrWeather , isValidCoords} = require('./utils');

const prgVersion = 0.3;
cprl.version(prgVersion);


cprl
.action((args,options)=>{
  let str=""
  let coords = [];
  fs.readFile(path.join(__dirname,'/','coords'), 'utf8', function(err, data){
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
        //add wcode check
        let wcode = weatherCodes[apiData.current_weather.weathercode];
        table.push(
            [chalk.yellow.bold(`${apiData.current_weather.temperature}°C`),chalk.yellow.bold(`${apiData.current_weather.windspeed} km/h`),chalk.yellow.bold(`${apiData.current_weather.winddirection}°`) ,chalk.yellow.bold(`${wcode}`)]
          );
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
    fs.writeFile((path.join(__dirname,'/','coords')), content, function(err) {
      if(err) {
        return console.log(err);
      }
      // let table = new Table({
      //   head:[chalk.white.bold('Latitude'),chalk.white.bold('Longitude')]
      // });
      let table = new Table()
      table.push([chalk.yellow.bold(`Successfully set coordinates to ${args.latitude} , ${args.longitude}`)]);
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
