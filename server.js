const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Enable CORS for all origins
app.use(cors());
app.use(express.json());

// ✅ Handle image forwarding at `/receive-image`
app.post("/receive-image", (req, res) => {
    console.log("📥 Received image from Python Bot:", req.body);

    if (!req.body.image_url) {
        return res.status(400).json({ error: "No image URL received" });
    }

    console.log(`✅ Image URL: ${req.body.image_url}`);

    // 🔹 Here, you can process the image (store it, send it elsewhere, etc.)

    res.json({ message: "Image received successfully!" });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Node.js Server is running on port ${PORT}...`);
});
