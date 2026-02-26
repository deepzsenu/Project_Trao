import { useState, useEffect } from "react";
import { toggleFavorite } from "../services/cityService";

export default function CityCard({ city, onFavoriteToggle }) {
  const [updating, setUpdating] = useState(false);

  // Handle favorite toggle
  const handleFavorite = async () => {
    try {
      setUpdating(true);
      const updatedCity = await toggleFavorite(city._id);
      onFavoriteToggle(updatedCity);
    } catch (err) {
      console.error("Failed to toggle favorite:", err);
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white p-4 rounded shadow flex items-center justify-between ${
        city.isFavorite ? "border-2 border-yellow-400" : ""
      }`}
    >
      {/* City Name */}
      <div>
        <h2 className="text-lg font-semibold">{city.name}</h2>

        {/* Weather Info */}
        {city.weather ? (
          city.weather.error ? (
            <p className="text-sm text-gray-500">{city.weather.error}</p>
          ) : updating ? (
            <div className="w-24 h-6 bg-gray-200 animate-pulse rounded mt-1"></div>
          ) : (
            <div className="flex items-center mt-1 space-x-2">
              <img
                src={`https://openweathermap.org/img/wn/${city.weather.icon}@2x.png`}
                alt={city.weather.condition}
                className="w-10 h-10"
              />
              <div>
                <p className="text-sm">
                  {Math.round(city.weather.temperature)}°C
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {city.weather.condition}
                </p>
              </div>
            </div>
          )
        ) : (
          // Skeleton if weather is undefined
          <div className="w-24 h-6 bg-gray-200 animate-pulse rounded mt-1"></div>
        )}
      </div>

      {/* Favorite Button */}
      <button
        onClick={handleFavorite}
        className={`p-2 rounded-full transition-colors duration-200 ${
          city.isFavorite ? "bg-yellow-400 text-white" : "bg-gray-200 text-gray-600"
        }`}
      >
        ★
      </button>
    </div>
  );
}