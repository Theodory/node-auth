var express = require('express');
var router = express.Router();

var userController = require('../controllers/userController');

router.get('/', (req, res, next) =>{
  res.render('register');
});

router.post('/', (req, res, next) =>{
  res.render('register');
});

module.exports = router;