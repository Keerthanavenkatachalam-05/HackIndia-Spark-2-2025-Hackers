const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file
  },
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const fs = require("fs");
if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

// File upload route
app.post("/analyze-resume", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "File upload failed" });
  }
  res.json({ message: "File uploaded successfully", filename: req.file.filename });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


// Start the server

app.get("/", (req, res) => {
    res.send("Server is running...");
  });
