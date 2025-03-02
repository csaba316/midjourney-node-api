const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let lastReceivedImage = null; // Store the latest received image URL

// ✅ Handle incoming images from the Discord bot
app.post("/receive-image", (req, res) => {
    console.log("📥 Received image:", req.body);

    if (!req.body.image_url) {
        return res.status(400).json({ error: "No image URL received" });
    }

    lastReceivedImage = req.body.image_url; // Store the latest image URL
    console.log(`✅ Image URL stored: ${lastReceivedImage}`);

    res.json({ message: "Image received successfully!", image_url: lastReceivedImage });
});

// ✅ Serve the latest image for Elementor to fetch
app.get("/latest-image", (req, res) => {
    if (!lastReceivedImage) {
        return res.status(404).json({ error: "No image available" });
    }
    res.json({ image_url: lastReceivedImage });
});

// ✅ Start the server
app.listen(PORT, () => {
    console.log(`🚀 Node.js Server is running on port ${PORT}...`);
});
