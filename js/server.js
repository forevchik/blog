const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json()); // Для обробки JSON
app.use(express.static('public')); // Для сервування статичних файлів (HTML, CSS, JS)

let comments = []; // Тимчасове сховище коментарів

// Ендпоінт для отримання коментарів
app.get('/get-comments', (req, res) => {
  res.json(comments);
});

// Ендпоінт для збереження коментаря
app.post('/save-comment', (req, res) => {
  const { name, comment } = req.body;
  comments.push({ name, comment });
  res.json({ success: true, comments });
});

// Запуск сервера
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
