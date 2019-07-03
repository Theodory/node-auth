var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', userController.index);

router.post('/', userController.register);

module.exports = router;