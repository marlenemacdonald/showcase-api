var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var index = require('../routes/index.js');
var UserModel = require('../models/UserModel.js');

var router = express.Router();

router.post('/', passport.authenticate('local-signup', {
	'successRedirect' : '/',
	'failureRedirect' : '/'
}));



function checkUser(username, callback){

	router.get('/', function(req, res, next){

		var userExists = null;

		UserModel.findOne({ 'local.username': req.body.username }, function (err, doc){     
 
        	if(err){
              console.error(err);
          	}
          	if(doc===null) {
              userExists = false;
          	}
          	else {
              userExists = true;
          	}
          	callback(userExists);
    	});
	});
}
/*router.get('/success', function(err, res, next){
	res.status(200).json({
		"message": "User created successfully!"
	});
});
router.get('/failure', function(err, res, next){
	res.status(500).json({
		"message": "User not created.",
		"errorCode": '95173'
	})
});*/


module.exports = router;