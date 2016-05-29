var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  res.send('respond with a normal post response');
});

router.post('/:id/', function(req, res, next) {

	var db = req.db;

	var cars = db.collection('cars').find();
	console.log(cars);

  res.send('respond with a resource');
});

/*router.put('/:id/', function(req, res, next) {

	var db = req.db;

	var cars = db.collection('cars').find();
	console.log(cars);

  res.send('respond with a resource');
});*/

module.exports = router;
