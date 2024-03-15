// Предположим, что данные о пользователях хранятся в памяти
let users = [];
const { getAll } = require('../peru.js');

module.exports = {
  // Получение списка пользователей
  getAllUsers: (req, res) => {
    getAll()
    .then(data => {
        res.json(data);
    })
    .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    });
},

  // Создание нового пользователя
  createUser: (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: users.length + 1, name, email };
    users.push(newUser);
    res.status(201).json(newUser);
  }
};