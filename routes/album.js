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
    albumsCollection.find({}, (error, albumsList) => {
      if(error){
        next(error)
        return
      }
      res.render('albums', {
        albums: albumsList
      })
    })

});

//Launch New Albums
router.get('/albums/new', function(req, res, next) {
  res.render('albums/new');
});
//Launch Albums with inserted data

router.post('/albums/new', (req, res) => {
  albumsCollection.insert(req.body, (error, savedAlbum) => {
    if (error) {
      return
    }
    res.redirect('/albums')
  })
})

//Launch Edit Albums
router.get('/albums/:id/edit', function(req, res, next) {

  albumsCollection.findOne({_id:req.params.id},(err,albumsList)=>{
    res.render('albums/edit',{album:albumsList})
  })
  //res.render('albums/edit');
});

router.put('/albums/:id/edit', (req, res) => {
  albumsCollection.findAndModify({
    "query": {_id : req.params.id},
    "update": {'$set': req.body}
  }, (err, album) => {
    res.redirect('/albums')
  })
})
module.exports = router;
