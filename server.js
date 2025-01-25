const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json()); // Parse JSON data
app.use(cors()); // Allow Cross-Origin requests

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/registrationDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

// Mongoose Schema
const registrationSchema = new mongoose.Schema({
    name: String,
    Dob: String,
    mobile: String,
    gender: String,
    service: String,
    doj: String,
    place: String,
    address: String,
    idType: String,
    idNumber: String,
    termsAccepted: Boolean
});

const Registration = mongoose.model("Registration", registrationSchema);

// Route to handle form submissions
app.post("/api/register", async (req, res) => {
    try {
        const formData = req.body;
        const newRegistration = new Registration(formData);
        await newRegistration.save();
        res.status(200).json({ message: "Registration successful!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ message: "An error occurred", error });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
