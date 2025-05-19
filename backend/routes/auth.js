// const express = require("express");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const router = express.Router();
// const db = require("../db");

// const SECRET_KEY = "Aadhithyan";

// // Signup
// router.post("/register", async (req, res) => {
//   const { username, email ,password } = req.body;

//   const hashed = await bcrypt.hash(password, 10);

//   const query = "INSERT INTO login (username,email, password) VALUES (?,?, ?)";
//   db.query(query, [username,email , hashed], (err) => {
//     if (err) {
//       return res.status(500).json({ message: "Register failed" });
//     }

//     const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
//     res.json({ message: "Register successful", token });
//   });
// });

// // Login
// router.post("/login", (req, res) => {
//   const { username, password } = req.body;

//   const query = "SELECT * FROM login WHERE username = ?";
//   db.query(query, [username], async (err, results) => {
//     if (err || results.length === 0) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const user = results[0];
//     const valid = await bcrypt.compare(password, user.password);

//     if (!valid) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
//     res.json({ message: "Login successful", token });
//   });
// });

// module.exports = router;




