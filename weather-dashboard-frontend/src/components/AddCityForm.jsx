import { useState } from "react";
import { addCity } from "../services/cityService";

export default function AddCityForm({ onCityAdded }) {
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName) return;
    setLoading(true);
    try {
      const newCity = await addCity(cityName);
      onCityAdded(newCity); // Callback to update dashboard
      setCityName("");
    } catch (err) {
      alert("Failed to add city");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-4 gap-2">
      <input
        type="text"
        placeholder="Enter city name"
        className="flex-1 border p-2 rounded"
        value={cityName}
        onChange={(e) => setCityName(e.target.value)}
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 rounded"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add"}
      </button>
    </form>
  );
}