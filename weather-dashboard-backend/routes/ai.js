// routes/ai.js

const express = require("express");
const auth = require("../middleware/authMiddleware");
const City = require("../models/City");
const { getWeatherByCity } = require("../services/weatherService");
const { askWeatherAgent } = require("../services/aiAgentService");

const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ message: "Question is required" });
    }

    const cities = await City.find({ user: req.user.id });

    const citiesWithWeather = await Promise.all(
      cities.map(async (city) => {
        const weather = await getWeatherByCity(city.name);
        return {
          name: city.name,
          isFavorite: city.isFavorite,
          weather,
        };
      })
    );

    const answer = await askWeatherAgent(question, citiesWithWeather);

    res.json({ answer });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "AI processing failed" });
  }
});

module.exports = router;