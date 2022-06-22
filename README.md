# wnow-cli
 CLI application to check the current weather in the terminal.

 ![](img/show1.gif)

# About
  wnow is a command line program that gives you weather information for any given co-ordinates using the [Open-Meteo API](https://open-meteo.com/en).


# Installation
- Clone the Repository and navigate into wnow-cli
- Run The Following Command to install dependencies
 ```sh
 npm install
 ```
- To install globally
 ```sh
 npm install -g .
 ```

# Usage
- Set Latitude and Longitude
```sh
wnow set <latitude> <longitude>
```
- Check the weather
```sh
wnow
```

# Note
The folks at open-meteo have a very generous 10,000 request limit per day , please keep that in mind when using the application.
