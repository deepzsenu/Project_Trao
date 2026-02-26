import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import AddCityForm from "../components/AddCityForm";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { getCities, addCity, toggleFavorite, deleteCity } from "../services/cityService";

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await getCities();
      setCities(data);
    } catch (err) {
      setError("Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAdd = async (name) => {
    await addCity(name);
    fetchCities();
  };

  const handleToggleFavorite = async (id) => {
    await toggleFavorite(id);
    fetchCities();
  };

  const handleDelete = async (id) => {
    await deleteCity(id);
    fetchCities();
  };

  const sortedCities = [...cities].sort((a, b) => b.isFavorite - a.isFavorite);

  return (
    <Layout>
      <AddCityForm onAdd={handleAdd} />

      {loading && <Loader />}
      {error && <ErrorState message={error} />}
      {!loading && cities.length === 0 && <EmptyState />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedCities.map((city) => (
          <CityCard
            key={city._id}
            city={city}
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;