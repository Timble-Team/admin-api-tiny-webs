// Import Swagger documentation
const express = require('express')
const router = express.Router()
const path = require('path')
const Picture = require(`../models/Picture`)
const albumCtrl = require(`../controllers/album.controller`)
const articleCtrl = require(`../controllers/article.controller`)
const videoCtrl = require(`../controllers/video.controller`)
const categoryCtrl = require(`../controllers/category.controller`)

/* Show a user. */
router.get('/pictures/uploads/*', function (req, res, next) {
  console.log(req.params[0], path.resolve(`./uploads/${req.params[0]}`))
  res.sendfile(path.resolve(`./uploads/${req.params[0]}`));
});

router.get('/pictures', async (req, res, next) => {
  console.log(12312312)
  let pics = await Picture.find({agency_id: req.headers['agency-id'], favorite: true, album_id: null, article_id: null})
  res.json(pics)
})

router.get('/albums', albumCtrl.index)
router.get('/albums/:id', albumCtrl.show)

router.get('/articles', articleCtrl.index)
router.get('/articles/:id', articleCtrl.show)

router.get('/videos', videoCtrl.index)
router.get('/videos/:id', videoCtrl.show)

router.get('/categories/:agencyId', categoryCtrl.publicIndex) 
router.get('/categories/:agencyId/details', categoryCtrl.publicShow)

module.exports = router