//Define our strategies in this file
//Bring in passport local module
//pull a specific object out: Strategy
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
//Bring in bcrypt since we need to match our passwords and our password is encrypted hash.
const bcrypt = require('bcryptjs');

//Load user model
const User = mongoose.model('users');

//Explore a function that is going to have our strategy in it
module.exports = function(passport){

  //Define local strategy
  passport.use(new LocalStrategy({usernameField: 'username'}, (username, password, done) =>{
    //Match user
    User.findOne({
      username:username
    }).then(user => {
      if(!user){
        return done(null, false, {message: 'No User Found'});
      }

      //Check the password
      //user.password is a hashed password
      bcrypt.compare(password, user.password, (err, isMatch)=> {
        if(err) throw err;
        if(isMatch){
          //null: no errors
          return done(null, user);
        }else{
          //null for the errors
          return done(null, false,{message:'Password Incorrect.'});
        }
      })
    })
  }));

  passport.serializeUser(function(user,done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}//end of export function