import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import sqlite3 from "sqlite3";
import cors from "cors";

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:3000', 
  'http://localhost:8080', 
  'http://localhost/JacquesFarrell/',
  'http://localhost',
  'http://localhost:80',
  'http://4.147.168.43/JacquesFarrell/',
  'http://4.147.168.43',
  'http://4.147.168.43:3000',
  'http://4.147.168.43:80'
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, origin);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}));

const connection = new sqlite3.Database("./db/aplikasi.db");

app.get("/api/user/:id", (req, res) => {
  const query = `SELECT * FROM users WHERE id = ?`;
  connection.all(query, [req.params.id], (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

app.post("/api/user/:id/change-email", (req, res) => {
  const newEmail = req.body.email;
  const userId = req.params.id;
  const query = `UPDATE users SET email = ? WHERE id = ?`;

  connection.run(query, [newEmail, userId], function (err) {
    if (err) throw err;
    if (this.changes === 0) res.status(404).send("User not found");
    else res.status(200).send("Email updated successfully");
  });
});

app.get("/api/file", (req, res) => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  const filePath = path.join(__dirname, "files", req.query.name);
  // Memastikan path tidak keluar dari direktori 'files'
  if (!filePath.startsWith(path.join(__dirname, "files"))) {
    return res.status(403).send("Access denied");
  }
  console.log(filePath);
  res.sendFile(filePath);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
