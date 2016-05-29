var express = require('express');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var router = express.Router();
var bodyParser = require('body-parser');
var Token = require('../config/token');



var UserModel = require('../models/UserModel.js');

router.get('/:id', Token.verify, function(req, res, next){
	console.log("");
	console.log("=============================");

	console.log("GET request to users/");

	console.log(req.params);
	console.log(req.params.id);

	UserModel.findOne({
		'_id': req.params.id
	},
	function(err, User){
		if(err){
			return next(err);
		} else {
			res.json(User);
		}
	});

});

router.put('/:id', Token.verify, function(req, res, next){
		console.log("");
		console.log("=======================");
		console.log("PUT request to profile/");
		console.log(req.body);
	
		UserModel.findByIdAndUpdate(req.params.id, { $set: { 'local.firstName': req.body.firstName,
															 'local.lastName': req.body.lastName,	
															 'local.username': req.body.username }}, { 'new': true}, function(err, post){

			if (err){
				return res.status(500).json(err);
			}
			else {
				console.log("Profile updated");
				console.log(post);
				res.json(post);
			}
		});
});


module.exports = router;