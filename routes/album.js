const express = require('express');
const path = require('path')
const router = express.Router();
const database = require(path.resolve('config/database'))
const albumsCollection = database.get('albums')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('albums/index');
});

//Launch Albums
router.get('/albums', function(req, res, next) {
 
    res.render('albums')

});

//Launch New Albums
router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});
module.exports = router;