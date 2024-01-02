const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

/* GET users listing. */
router.get('/', userController.getUserByEmail);

router.post('/', userController.postUser);

module.exports = router;
