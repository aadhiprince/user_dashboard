const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const userRoutes = require("./routes/users");
const db = require('./db');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET_KEY = "Aadhithyan";


app.use(cors());
app.use(bodyParser.json());


app.use("/api/users", userRoutes); 

app.post("/api/auth/register", async (req, res) => {
  const { username ,password } = req.body;

  console.log("Registering user:", username);
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const query = "INSERT INTO login (username, password) VALUES (?, ?)";
  db.query(query, [username, hashed], (err) => {
    if (err) {
      return res.status(500).json({ message: "Register failed" });
    }

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Register successful", token });
  });
});

// Login
app.post("/api/auth/login", (req, res) => {
  const { username, password } = req.body;
  console.log("Logging in user:", username);
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = "SELECT * FROM login WHERE username = ?";
  db.query(query, [username], async (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
console.log("User found:", results[0]);
    const user = results[0];
    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: "1h" });
    res.json({ message: "Login successful", token });
  });
});



app.listen(3000, () => console.log("Server running on port 3000"));









