require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allow frontend requests
app.use(express.json());

// Endpoint to fetch news securely
app.get("/news", async (req, res) => {
    const { query } = req.query; // Example: /news?query=bitcoin

    if (!query) {
        return res.status(400).json({ error: "Query parameter is required" });
    }

    try {
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch news", details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
