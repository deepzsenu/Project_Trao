const express = require("express");
const City = require("../models/City");
const auth = require("../middleware/authMiddleware");
const { getWeatherByCity } = require("../services/weatherService");
const router = express.Router();

// ---------- Add City ----------
router.post("/", auth, async (req, res) => {
  try {
    const { name } = req.body;

    const city = new City({
      name,
      user: req.user.id
    });

    await city.save();

    res.status(201).json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------- Get User Cities ----------
router.get("/", auth, async (req, res) => {
  try {
    const cities = await City.find({ user: req.user.id });

    const citiesWithWeather = await Promise.all(
      cities.map(async (city) => {
        const weather = await getWeatherByCity(city.name);

        return {
          _id: city._id,
          name: city.name,
          isFavorite: city.isFavorite,
          weather: weather || { error: "Weather not found" }
        };
      })
    );

    res.json(citiesWithWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------- Toggle Favorite ----------
router.patch("/:id/favorite", auth, async (req, res) => {
  try {
    const city = await City.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    city.isFavorite = !city.isFavorite;
    await city.save();

    res.json(city);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------- Delete City ----------
router.delete("/:id", auth, async (req, res) => {
  try {
    const city = await City.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }

    res.json({ message: "City deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;