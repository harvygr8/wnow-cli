#!/usr/bin/env node

const cprl = require('caporal');
const Table = require('cli-table');
const figlet = require('figlet');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const {fetchCurrWeather} = require('./utils');

const prgVersion = 0.4;
cprl.version(prgVersion);


cprl
.argument('<location>','Specify location name')
.action((args,options)=>{
  let str=""
  let coords = [];
  fs.readFile(path.join(__dirname,'/','apikey'), 'utf8', function(err, data){
    if(err){
      console.log(chalk.red.bold(`No API key found! , use 'wnow set <key>'`));
      return;
    }
    fetchCurrWeather(data,args.location)
    .then(apiData=>{
      let table = new Table({
          head:[chalk.white.bold('Temperature'),chalk.white.bold('Weather'),chalk.white.bold('Humidity'),chalk.white.bold('Visibility'),
          chalk.white.bold('Wind Speed'),chalk.white.bold('Wind Direction')]
        });
        table.push(
            [chalk.yellow.bold(`${apiData.main.temp}°C`),chalk.yellow.bold(`${apiData.weather[0].main}`),chalk.yellow.bold(`${apiData.main.humidity} %`),chalk.yellow.bold(`${apiData.visibility} m`),
             chalk.yellow.bold(`${apiData.wind.speed} m/s`),chalk.yellow.bold(`${apiData.wind.deg}°`)]
          );
        console.log("");
        console.log(chalk.yellow.bold(figlet.textSync(`WNOW v ${prgVersion}`,{ font: 'Small'})));
        console.log(chalk.bold(table.toString()));
    })
    .catch(err=>{
      console.log(chalk.red.bold(`Error: ${err.message}`));
    })
  });
});

cprl
.command('set','Set your OpenWeatherMap API key')
.argument('<key>' ,'Specify API key')
.action((args,options)=>{

  let content = `${args.key}`;
  fs.writeFile((path.join(__dirname,'/','apikey')), content, function(err) {
    if(err) {
      return;
    }
    });
});


cprl
.command('credits','Show credits and Attributions')
.action(()=>{
  console.log(chalk.yellow.bold(`WNOW v${prgVersion} by harvygr8`))
})

cprl.parse(process.argv);
