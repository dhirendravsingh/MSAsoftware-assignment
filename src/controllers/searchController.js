const express = require("express");
const router = express.Router();
const searchService = require("../services/searchService");

// REST Endpoints
router.get("/pizza", async (req, res) => {
    try {
        const data = await searchService.fetchPizzaPlaces();
        res.json(data);
    } catch (error) {
        console.error("Error fetching pizza places:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/juice", async (req, res) => {
    try {
        const data = await searchService.fetchJuicePlaces();
        res.json(data);
    } catch (error) {
        console.error("Error fetching juice places:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

router.get("/combo", async (req, res) => {
    try {
        const data = await searchService.fetchComboPlaces();
        res.json(data);
    } catch (error) {
        console.error("Error fetching combo places:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
