const CityCard = ({ city, onToggleFavorite, onDelete }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 relative hover:shadow-lg transition">
      <button
        onClick={() => onToggleFavorite(city._id)}
        className={`absolute top-3 right-3 text-xl ${
          city.isFavorite ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ★
      </button>

      <h2 className="text-xl font-semibold">{city.name}</h2>

      {city.weather && !city.weather.error ? (
        <div className="mt-3 space-y-1 text-gray-600">
          <p>🌡 {city.weather.temperature}°C</p>
          <p>💧 {city.weather.humidity}% Humidity</p>
          <p>🌬 {city.weather.windSpeed} m/s</p>
          <p className="capitalize">☁ {city.weather.condition}</p>
        </div>
      ) : (
        <p className="text-red-500 mt-2">Weather not available</p>
      )}

      <button
        onClick={() => onDelete(city._id)}
        className="mt-4 text-sm text-red-500 hover:underline"
      >
        Delete
      </button>
    </div>
  );
};

export default CityCard;