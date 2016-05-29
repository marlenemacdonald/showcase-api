var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var jwt = require('jsonwebtoken');

var app = express();

var UserModel = require('../models/UserModel.js');

var router = express.Router();

router.post('/', function(req, res, next){

	passport.authenticate('local-login', function(err, user, info){
		if(err){
			res.status(500).json({
				'message': 'User login failed.',
				'error': '13234'
			});
		}

		//write a new token
		var token = jwt.sign(user, 'ilovemtlcollege', {
			//expiresIn: 1440 //exp in 24h
		});

		//handle authentication success
		res.status(200).json({
			'message': 'User successfully logged in.',
			'token': token,
			'id': user._id,
			'firstName': user.local.firstName,
			'lastName': user.local.lastName
		});
	})(req, res, next);
});




/*router.post('/', passport.authenticate('local-login', {
	'successRedirect' : '/login/success',
	'failureRedirect' : '/login/failure'
}));

router.get('/success', function(err, res, next){
	res.status(200).json({
		"message": "User logged in!"
	});
});
router.get('/failure', function(err, res, next){
	res.status(500).json({
		"message": "Access denied",
		"errorCode": '65432'
	})
});*/


module.exports = router;