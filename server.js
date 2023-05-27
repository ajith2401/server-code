const express = require('express');
const mysql = require('mysql');
const app = express();
require('dotenv').config();

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


app.use(express.json());

app.post('/api/comments', (req, res) => {
  const { name, mail_id, content, date, writingId, writingTitle } = req.body;

  // Execute the SQL query to insert the comment
  pool.query(
    'INSERT INTO comments (name, mail_id, content, date, writingId, writingTitle) VALUES (?, ?, ?, ?, ?, ?)',
    [name, mail_id, content, date, writingId, writingTitle],
    (error, results) => {
      if (error) {
        console.error('Error writing comment to MySQL:', error);
        res.status(500).json({ message: 'Error writing comment to MySQL' });
      } else {
        const commentId = results.insertId;
        res.status(200).json({ message: 'Comment stored', commentId });
      }
    }
  );
});

module.exports = app;
