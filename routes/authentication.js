var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/authentication', (req, res, next) =>{
  res.render('authentication', { title: 'Express' });
});

module.exports = router;