import React, { useState, useEffect } from "react";
import "./WeatherWidget.css";

function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("London"); // Default city is London
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Error fetching weather data");
      }
      const data = await response.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    }
  };

  // Fetch weather for the default city when component mounts
  useEffect(() => {
    fetchWeather(city);
  }, []);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    fetchWeather(city);
  };

  return (
    <div className="weather-widget">
      <div className="weather-search">
        <input 
          type="text"
          value={city}
          onChange={handleCityChange}
          placeholder="Enter city"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p className="error-message">Error: {error}</p>}
      {weather ? (
        <>
          <h3>Weather in {weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>Temp: {weather.main.temp}°C</p>
          <p>Humidity: {weather.main.humidity}%</p>
        </>
      ) : (
        !error && <p>Loading weather...</p>
      )}
    </div>
  );
}

export default WeatherWidget;

