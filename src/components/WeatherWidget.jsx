import React, { useState, useEffect } from "react";
import "./WeatherWidget.css"; // Import the CSS file

function WeatherWidget() {
  const [location, setLocation] = useState("Atlanta, GA"); // Default location
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {
    if (!location) {
      setError("Please enter a location.");
      return;
    }

    // Fetch weather data for the entered location using the API key from environment variables
    fetch(`https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${location}`)
      .then((response) => {
        if (!response.ok) {
          return response.json().then((errorData) => {
            throw new Error(errorData.error.message || "Network response was not ok");
          });
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError(null); // Clear any previous errors
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
        setError(error.message || "Error fetching weather data. Please try again.");
      });
  };

  // Fetch weather data for the default location on component mount
  useEffect(() => {
    handleSearch();
  }, []);

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
      {error && <p className="weather-error">{error}</p>}
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