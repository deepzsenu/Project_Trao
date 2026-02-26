import { useState } from "react";

const AddCityForm = ({ onAdd }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) return;
    onAdd(city);
    setCity("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        className="flex-1 px-4 py-2 rounded-md text-black border focus:ring-2 focus:ring-indigo-400"
      />
      <button
        type="submit"
        className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition active:scale-95"
      >
        Add
      </button>
    </form>
  );
};

export default AddCityForm;