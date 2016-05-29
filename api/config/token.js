var jwt = require('jsonwebtoken');

var Token = {
	verify: function(req, res, next){

	console.log(req.params);

		if(typeof req.params.id != 'undefined' && req.params.id != 'undefined'){

			//check to see if the token exists in the call (should be a header)
			var token = req.body.token || req.query.token || req.headers['x-access-token'];

			if(token){
				// verifies secret and checks expiry
			    jwt.verify(token, 'ilovemtlcollege', function(err, decoded) {      
			      if (err) {
			        return res.json({ 
			        	success: false, 
			        	message: 'Failed to authenticate token.',
			        	type: 'token'
			        });    
			      } else {
			        // if everything is good, save to request for use in other routes
			        req.decoded = decoded;    

			        next();
			      }
			    });

			  } else {

			    // if there is no token
			    // return an error
			    return res.status(403).send({ 
			        success: false, 
			        message: 'No token provided.',
			        type: 'token' 
		    	});
		    }
		} else {
			return res.status(403).send({ 
		        success: false, 
		        message: 'No ID provided.',
		        type: 'userId' 
	    	});
		}

	}
}
module.exports = Token;