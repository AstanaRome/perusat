const express = require('express');
const router = express.Router();

// Контроллеры
const imageController = require('../controllers/imageController');

// Эндпоинт для получения списка пользователей
router.get('/', imageController.getAllUsers);

// Эндпоинт для создания нового пользователя
router.post('/', imageController.createUser);

module.exports = router;