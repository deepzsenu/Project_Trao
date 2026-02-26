// controllers/cityController.js
exports.toggleFavorite = async (req, res) => {
  try {
    const city = await City.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    if (!city) return res.status(404).json({ message: "City not found" });

    city.isFavorite = !city.isFavorite;
    await city.save();
    res.json(city);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};