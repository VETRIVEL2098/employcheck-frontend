const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const { delayMiddleware } = require("./middleware/authMiddleware");
const mongoose = require("mongoose");
require("dotenv").config(); 
const app = express();

app.use(cors());
app.use(express.json());
app.use(delayMiddleware)

const MONGO_URI = process.env.DB_URI || 'mongodb+srv://vetri2098:JIo3ROuDBfczbocv@cluster0.woqdreh.mongodb.net/employchck' ;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.use("/users", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend server running 🚀" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});