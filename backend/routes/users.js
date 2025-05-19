const express = require('express');
const router = express.Router();
const db = require('../db');


// Get all users

router.get('/', verifyToken , (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});
// Add user
router.post('/', verifyToken ,(req, res) => {
  const { name, email, role, status } = req.body;
  db.query('INSERT INTO users (name, email, role, status) VALUES (?, ?, ?, ?)',
    [name, email, role, status], (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, ...req.body });
    });
});

// Update user
router.put('/:id', verifyToken , (req, res) => {
  const { name, email, role, status } = req.body;
  db.query('UPDATE users SET name=?, email=?, role=?, status=? WHERE id=?',
    [name, email, role, status, req.params.id], (err) => {
      if (err) return res.status(500).json(err);
      res.json({ id: req.params.id, ...req.body });
    });
});

// Delete user
router.delete('/:id', verifyToken , (req, res) => {
  db.query('DELETE FROM users WHERE id=?', [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ id: req.params.id });
  });
});

const SECRET_KEY = "Aadhithyan";

// Middleware to verify token
function verifyToken(req, res, next) {
  const token = req.headers["authorization"];

  if (!token) return res.status(403).json({ message: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Invalid token" });

    req.username = decoded.username;
    next();
  });
}


module.exports = router;
