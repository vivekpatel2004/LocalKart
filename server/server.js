const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
 // add this line at the top


const productRoutes = require("./routes/productRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB (clean and up-to-date)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Use Routes
app.use("/api/products", productRoutes);

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
