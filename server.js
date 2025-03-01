const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
    res.send("<h2>MidJourney Image API is Running 🚀</h2>");
});

// Save received image URL
app.post("/receive-image", (req, res) => {
    const { image_url } = req.body;
    if (image_url) {
        fs.writeFileSync("latest_image.json", JSON.stringify({ image_url }));
        console.log("Image received:", image_url);
        res.sendStatus(200);
    } else {
        res.status(400).json({ error: "No image URL provided" });
    }
});

// Serve the latest image URL
app.get("/get-latest-image", (req, res) => {
    if (fs.existsSync("latest_image.json")) {
        res.json(JSON.parse(fs.readFileSync("latest_image.json", "utf8")));
    } else {
        res.json({ image_url: null });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => console.log(`Server running on port ${PORT}`));
