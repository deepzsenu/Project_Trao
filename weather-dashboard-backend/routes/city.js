const express = require("express");
const City = require("../models/City");
const auth = require("../middleware/authMiddleware");
const { getWeatherByCity } = require("../services/weatherService");
const router = express.Router();

// Add city
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
        res.status(500).json({ message: "Server Error" });
    }
});

// Get user cities
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
        res.status(500).json({ message: "Server Error" });
    }
});

router.put("/:id/favorite", auth, async (req, res) => {
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
        res.status(500).json({ message: "Server Error" });
    }
});

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
        res.status(500).json({ message: "Server Error" });
    }
});


module.exports = router;