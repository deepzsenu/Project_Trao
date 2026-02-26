import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getCities } from "../services/cityService";
import AddCityForm from "../components/AddCityForm";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

export default function Dashboard() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Sort favorites first
  const sortCities = (arr) =>
    [...arr].sort((a, b) => (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0));

  // Fetch cities
  const fetchCities = async () => {
    if (cities.length === 0) setLoading(true);
    setError("");
    try {
      const data = await getCities();
      if (data && Array.isArray(data)) {
        setCities(sortCities([...data])); // new array reference
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
    const interval = setInterval(fetchCities, 5 * 60 * 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Add city
  const handleCityAdded = (city) => {
    setCities((prev) => sortCities([city, ...prev]));
  };

  // Favorite toggle
  const handleFavoriteToggle = async (updatedCity) => {
    setCities((prev) =>
        sortCities(
        prev.map((c) =>
            c._id === updatedCity._id
            ? { ...updatedCity, weather: c.weather } // keep existing weather
            : c
        )
        )
    );

    try {
        const refreshedCities = await getCities(); // fetch latest weather
        setCities(sortCities([...refreshedCities]));
    } catch (err) {
        console.error("Failed to refresh weather:", err);
    }
    };

  return (
    <Layout>
      <AddCityForm onCityAdded={handleCityAdded} />

      {loading && cities.length === 0 && <Loader />}
      {error && <ErrorState message={error} />}
      {!loading && !error && cities.length === 0 && (
        <EmptyState message="No cities added yet" />
      )}

      <div className="grid gap-4 mt-4">
        {cities.map((city) => (
          <CityCard
            key={city._id}
            city={city}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
    </Layout>
  );
}