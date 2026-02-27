import { useEffect, useMemo, useState } from "react";
import Layout from "../components/Layout";
import AddCityForm from "../components/AddCityForm";
import CityCard from "../components/CityCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import SkeletonCard from "../components/SkeletonCard";

import {
  getCities,
  addCity,
  toggleFavorite,
  deleteCity,
} from "../services/cityService";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

const Dashboard = () => {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchCities = async () => {
    try {
      setLoading(true);
      const data = await getCities();
      setCities(data);
    } catch {
      setError("Failed to load cities");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  
  const handleAdd = async (name) => {
    const tempCity = {
      _id: Date.now().toString(),
      name,
      isFavorite: false,
      weather: { loading: true },
    };

    setCities((prev) => [tempCity, ...prev]);

    try {
      await addCity(name);
      toast.success("City added");
      fetchCities();
    } catch {
      toast.error("Failed to add city");
      setCities((prev) => prev.filter((c) => c._id !== tempCity._id));
    }
  };

  
  const handleToggleFavorite = async (id) => {
    const previous = [...cities];

    setCities((prev) =>
      prev.map((city) =>
        city._id === id
          ? { ...city, isFavorite: !city.isFavorite }
          : city
      )
    );

    try {
      await toggleFavorite(id);
      toast.success("Favorite updated");
    } catch {
      toast.error("Failed to update favorite");
      setCities(previous);
    }
  };

  
  const handleDelete = async (id) => {
    const previous = [...cities];

    setCities((prev) => prev.filter((city) => city._id !== id));

    try {
      await deleteCity(id);
      toast.success("City deleted");
    } catch {
      toast.error("Delete failed");
      setCities(previous);
    }
  };

  // ----------------------------
  // Search + Sorting
  // ----------------------------
  const filteredCities = useMemo(() => {
    return cities
      .filter((city) =>
        city.name.toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) => b.isFavorite - a.isFavorite);
  }, [cities, search]);

  return (
    <Layout>
      <AddCityForm onAdd={handleAdd} />

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search cities..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 w-full px-4 py-2 border text-black rounded-lg focus:ring-2 focus:ring-indigo-400"
      />

      {loading && <Loader />}
      {error && <ErrorState message={error} />}
      {!loading && filteredCities.length === 0 && <EmptyState />}
      {loading &&
        Array(6)
            .fill(0)
            .map((_, i) => <SkeletonCard key={i} />)}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredCities.map((city) => (
            <motion.div
              key={city._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <CityCard
                city={city}
                onToggleFavorite={handleToggleFavorite}
                onDelete={handleDelete}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default Dashboard;