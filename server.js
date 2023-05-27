const fs = require('fs');
const express = require('express');
const path = require('path');

const app = express();
app.use(express.json());

const commentsFilePath = path.join(__dirname, 'comments.json');

app.post('/api/comments', (req, res) => {
  const { name, mail_id, content, date, writingId, writingTitle } = req.body;
  const newComment = {
    name: name,
    mail_id: mail_id,
    content: content,
    date: date,
    writingId: writingId,
    writingTitle: writingTitle,
  };

  // Read the existing comments from the JSON file
  let comments = [];
  try {
    const data = fs.readFileSync(commentsFilePath, 'utf8');
    comments = JSON.parse(data);
  } catch (err) {
    console.error('Error reading comments file:', err);
    res.status(500).json({ message: 'Error reading comments file' });
    return;
  }

  // Add the new comment to the array
  comments.push(newComment);

  // Write the updated comments back to the JSON file
  try {
    const jsonData = JSON.stringify(comments);
    fs.writeFileSync(commentsFilePath, jsonData, 'utf8');
    res.status(200).json({ message: 'Comment stored', comment: newComment });
  } catch (err) {
    console.error('Error writing comments file:', err);
    res.status(500).json({ message: 'Error writing comments file' });
  }
});

// Endpoint to handle '/ajith'
app.get('/ajith', (req, res) => {
  res.send('hello ajith');
});

// Serve the static files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
const port = 3000; // or any other port you prefer
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

module.exports = app;
