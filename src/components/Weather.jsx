import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";

function Weather({ destination }) {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const weatherResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${destination}&units=metric&appid=${API_KEY}`
        );
        setWeather(weatherResponse.data);

        const forecastResponse = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${destination}&units=metric&appid=${API_KEY}`
        );
        setForecast(forecastResponse.data);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    if (destination) {
      fetchWeather();
    }
  }, [destination]);

  if (!weather || !forecast) return <div>Loading weather data...</div>;

  return (
    <div className="weather">
      <h3>Weather in {destination}</h3>
      <div className="current-weather">
        <h4>Current Weather</h4>
        <p>Temperature: {weather.main.temp}°C</p>
        <p>Condition: {weather.weather[0].description}</p>
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
        />
      </div>
      <div className="forecast">
        <h4>5-Day Forecast</h4>
        <ul>
          {forecast.list
            .filter((item, index) => index % 8 === 0)
            .map((item) => (
              <li key={item.dt}>
                <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                <p>Temp: {item.main.temp}°C</p>
                <p>{item.weather[0].description}</p>
                <img
                  src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}
                  alt={item.weather[0].description}
                />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Weather;
