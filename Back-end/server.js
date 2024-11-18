// server.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;
app.use(cors({
    origin: 'http://localhost:5173'  // Frontend origin
}));
// Middleware setup
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json({ limit: '10mb' }));

// Base directory for images
const imagesDirectory = path.join(__dirname, 'photos');
if (!fs.existsSync(imagesDirectory)) {
    fs.mkdirSync(imagesDirectory);
}

// Endpoint to handle image uploads
app.post('/photos', (req, res) => {
    const { image, filename, childName, sessionId } = req.body;

    // Ensure all required fields are provided
    if (!image || !filename || !childName || !sessionId) {
        return res.status(400).json({ error: 'Missing required fields: image, filename, childName, or sessionId' });
    }

    // Define paths for the child and session directories
    const childDirectory = path.join(imagesDirectory, childName);
    const sessionDirectory = path.join(childDirectory, sessionId);

    // Create directories if they don’t exist
    if (!fs.existsSync(childDirectory)) {
        fs.mkdirSync(childDirectory, { recursive: true });
    }
    if (!fs.existsSync(sessionDirectory)) {
        fs.mkdirSync(sessionDirectory, { recursive: true });
    }

    // Decode base64 image and save it
    const base64Data = image.replace(/^data:image\/png;base64,/, "");
    const filePath = path.join(sessionDirectory, filename);

    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            console.error("Error saving image:", err);
            return res.status(500).json({ error: 'Error saving image' });
        }
        res.json({ success: true, message: 'Image saved successfully' });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));