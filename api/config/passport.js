var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var UserModel = require('../models/UserModel');

// =========================================================================
// passport session setup ==================================================
// =========================================================================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    UserModel.findById(id, function(err, user) {
        done(err, user);
    });
});

// LOCAL SIGNUP 
passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) {

        // asynchronous
        // UserModel.findOne wont fire unless data is sent back
        process.nextTick(function() {

            console.log(req.body);

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            UserModel.findOne({ 'local.username' :  username }, function(err, user) {

                // if there are any errors, return the error
                if (err){
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false);
                } else {

                    // if there is no user with that username create them

                    //we create an instance of our model to make use of the generateHash method
                    var newUser = new UserModel();

                    var userObj = req.body,
                        userToCreate = {
                            local: req.body
                        };

                    userToCreate.local.password = newUser.generateHash(password);

                    UserModel.create(userToCreate, function(err, post){
                        if (err){
                            throw err;
                        }
                        return done(null, newUser);
                    });
                    
                }
            });    
        });
    })
);

// LOCAL LOGIN
passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'username',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass back the entire request to the callback
},
function(req, username, password, done) { // callback with email and password from our form

    // find a user whose email is the same as the forms email
    // we are checking to see if the user trying to login already exists
    UserModel.findOne({ 'local.username' :  username }, function(err, user) {
        // if there are any errors, return the error before anything else
        if (err){
            return done(err);
        }

        // if no user is found, return the message
        if (!user){
            return done(null, false);
        }

        // if the user is found but the password is wrong
        if (!user.validPassword(password)){
            return done(null, false);
        }

        // all is well, return successful user
        return done(null, user);
    });

}));

module.exports = passport;