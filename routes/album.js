var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('album/index');
});

//Launch Albums
router.get('/albums', function(req, res, next) {
  res.render('album/albums');
});

//Launch New Albums
router.get('/albums/new', function(req, res, next) {
  res.render('album/albums/new');
});
module.exports = router;