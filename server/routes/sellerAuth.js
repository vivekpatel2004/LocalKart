const express = require("express");
const router = express.Router();
const Seller = require("../models/Seller");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ✅ Use environment variable instead of hardcoded string
const JWT_SECRET = process.env.JWT_SECRET;

// 👉 Signup Route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await Seller.findOne({ email });
  if (existing) return res.status(400).json({ error: "Seller already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const newSeller = new Seller({ name, email, password: hashed });

  await newSeller.save();
  res.status(201).json({ message: "Seller registered successfully" });
});

// 👉 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const seller = await Seller.findOne({ email });

  if (!seller) return res.status(400).json({ error: "Invalid email" });

  const isMatch = await bcrypt.compare(password, seller.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid password" });

  const token = jwt.sign({ sellerId: seller._id }, JWT_SECRET);
  res.json({ token, sellerId: seller._id });
});

module.exports = router;
