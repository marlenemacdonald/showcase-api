var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');

var UserModel = require('../models/UserModel.js');

var router = express.Router();

router.get('/', function(req, res){
	req.logout();
	res.send("logged out");

});

module.exports = router;