import React, { useState } from "react";
import "./WeatherWidget.css"; // Import the CSS file

function WeatherWidget() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    // Fetch weather data for the entered location using the proxy
    fetch(`/api/v1/current.json?key=YOUR_API_KEY&q=${location}`)
      .then((response) => response.json())
      .then((data) => setWeather(data))
      .catch((error) => console.error("Error fetching weather data:", error));
  };

  return (
    <div className="weather-widget">
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="Enter location"
        className="weather-input"
      />
      <button onClick={handleSearch} className="weather-button">
        Search
      </button>
      {weather && (
        <div className="weather-info">
          <h3>{weather.location.name}</h3>
          <p>{weather.current.temp_c}°C</p>
          <p>{weather.current.condition.text}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;