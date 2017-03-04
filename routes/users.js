var express = require('express');
var router = express.Router();
var cosa2 = require('./../configDB/MongooseConfig').getInstance();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log(cosa2);
  res.send('respond with a resource');
});

module.exports = router;
