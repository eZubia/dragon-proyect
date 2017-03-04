var express = require('express');
var router = express.Router();
var cosa = require('./../configDB/MongooseConfig').getInstance();
var cosa2 = require('./../configDB/MongooseConfig').getInstance();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(cosa);
  console.log(cosa2);
  res.render('index', { title: 'Express' });
});

module.exports = router;
