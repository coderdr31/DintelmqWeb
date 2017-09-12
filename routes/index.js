var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('nav-fixed', { title: 'pug-Bootstrap' });
});

module.exports = router;
