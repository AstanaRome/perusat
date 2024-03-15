const express = require('express');
const app = express();

// Подключение маршрутов
const imageRoutes = require('./routes/imageRoutes');

// Разрешить приложению парсить JSON-тела запросов
app.use(express.json());

// Использование маршрутов
app.use('/api/users', imageRoutes);

// Обработчик ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
