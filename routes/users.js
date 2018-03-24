const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();

//Load User Model
require('../models/User');
const User = mongoose.model('users');

//User Register Route
router.get('/register', (req,res) => {
  res.render('users/register');
});

//Logout Router
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', "You've been logged out.");
    res.redirect('/');
});

//Login Form Post
router.post('/login', (req,res,next) =>{
  passport.authenticate('local',{
    successRedirect: '/shoes',
    failureRedirect: '/',
    failureFlash: true
  })(req,res,next);

});
//Register Form POST
router.post('/register', (req,res) =>{
  let errors =[];

  if(req.body.password != req.body.password2){
    errors.push({text: 'Passwords do not match.'});
  }

  if(req.body.password.length <4){
    errors.push({text: 'Passwords must be at least 4 characters.'});
  }

  if(errors.length>0){
    res.render('users/register', {
      //Keep what a user entered before
      errors: errors,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2
    })
  } else{
    //Check duplicate emails
    User.findOne({email: req.body.email})
      .then(user => {
        if(user){
          req.flash('error_msg', 'Email already registered.');
          res.redirect('/users/register');
        }else{

          //Check duplicate usernames
          User.findOne({username: req.body.username})
          .then(user => {
            if(user){
              req.flash('error_msg', 'Username already taken.');
              res.redirect('/users/register');
            } else {

          const newUser =new User({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err,salt)=> {
            bcrypt.hash(newUser.password,salt, (err,hash) =>{
              if (err) throw err;
              //hash: hash password
              newUser.password = hash;
              newUser.save()
                .then(user =>{
                  req.flash('success_msg', 'You are now registered and can login.');
                  res.redirect('/');
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        } //end of 2nd inside else
        });//end of 2nd then
        }//end of else inside

      });//end of 1st then

  }
});

module.exports = router;
