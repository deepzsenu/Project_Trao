import { motion } from "framer-motion";
import WeatherChart from "./WeatherChart";
import React from "react";

const CityCard = ({ city, onToggleFavorite, onDelete }) => {
  const isFav = city.isFavorite;
  const hasWeather = city.weather && !city.weather.error;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative rounded-2xl p-5 transition-all duration-300 backdrop-blur-md
        ${
          isFav
            ? "bg-yellow-100/90 border-2 border-yellow-400 shadow-xl shadow-yellow-300/40"
            : "bg-white/90 border border-gray-300 shadow-lg"
        }
      `}
    >
      {/* Favorite Badge */}
      {isFav && (
        <span className="absolute top-3 left-3 text-xs font-semibold bg-yellow-500 text-white px-3 py-1 rounded-full shadow-md">
          ★ Favorite
        </span>
      )}

      {/* Star Toggle */}
      <button
        onClick={() => onToggleFavorite(city._id)}
        className={`
          absolute top-3 right-3 text-2xl transition-transform duration-200
          ${
            isFav
              ? "text-yellow-500 scale-110 drop-shadow-md"
              : "text-gray-400 hover:text-yellow-500"
          }
        `}
      >
        ★
      </button>

      {/* City Name */}
      <h2 className="text-xl font-bold mt-8 text-gray-800">
        {city.name}
      </h2>

      {/* Weather Section */}
      {hasWeather ? (
        <>
          <div className="mt-3 space-y-1 text-gray-700">
            <p>🌡 {city.weather.temperature}°C</p>
            <p>💧 {city.weather.humidity}% Humidity</p>
            <p>🌬 {city.weather.windSpeed} m/s</p>
            <p className="capitalize">☁ {city.weather.condition}</p>
          </div>

          {/* ✅ SAFE Weather Chart */}
          <WeatherChart temperature={city.weather.temperature} />
        </>
      ) : (
        <p className="text-gray-500 mt-3 italic">
          Fetching weather...
        </p>
      )}

      {/* Delete */}
      <button
        onClick={() => onDelete(city._id)}
        className="mt-4 text-sm text-red-600 hover:underline"
      >
        Delete
      </button>
    </motion.div>
  );
};

export default React.memo(CityCard);