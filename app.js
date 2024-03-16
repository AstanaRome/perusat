const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const turf = require('@turf/turf');
const app = express();
const port = 3000;

// Подключение к базе данных SQLite
const db = new sqlite3.Database('example.db');

// Парсинг JSON-тела запроса
app.use(bodyParser.json());

// Middleware для обработки CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// Обработка POST-запроса
app.post('/', (req, res) => {
    // Данные, полученные от клиента (прямоугольник и период)
    const clientRectangle = req.body.clientRectangle;
    const startDate = req.body.startDate;
    const endDate = req.body.endDate;
    const rectanglePolygon = turf.polygon([[
      [clientRectangle.topLeft.longitude, clientRectangle.topLeft.latitude],
      [clientRectangle.topRight.longitude, clientRectangle.topRight.latitude],
      [clientRectangle.bottomRight.longitude, clientRectangle.bottomRight.latitude],
      [clientRectangle.bottomLeft.longitude, clientRectangle.bottomLeft.latitude],
      [clientRectangle.topLeft.longitude, clientRectangle.topLeft.latitude]
  ]]);
    console.log(req.body)
    // SQL-запрос для извлечения данных
    const sqlQuery = `
        SELECT *
        FROM satellite_data
        WHERE
          
           acquisition_start_date >= '${startDate}'
            AND acquisition_start_date <= '${endDate}'
    `;

    // Выполнение SQL-запроса
    db.all(sqlQuery, (error, rows) => {
        if (error) {
            console.error('Ошибка выполнения запроса:', error);
            res.status(500).send('Ошибка выполнения запроса');
            return;
        }
    
        // Отправка результатов клиенту
        const filteredRows = rows.filter(row => {
          const rowPolygon = turf.polygon([[
              [row.nw_corner_longitude, row.nw_corner_latitude],
              [row.ne_corner_longitude, row.ne_corner_latitude],
              [row.se_corner_longitude, row.se_corner_latitude],
              [row.sw_corner_longitude, row.sw_corner_latitude],
              [row.nw_corner_longitude, row.nw_corner_latitude]
          ]]);
          return turf.booleanIntersects(rectanglePolygon, rowPolygon);
      });
  
      // Отправка отфильтрованных результатов клиенту
      res.json(filteredRows);
    });
});

// Запуск сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
