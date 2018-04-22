const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const router = express.Router();
const {ensureAuthenticated} = require('../helpers/auth');

//Load User Model
require('../models/User');
const User = mongoose.model('users');

//User Register Route
router.get('/register', (req,res) => {
  res.render('users/register');
});


//User account settings Route 2.0
router.get('/settings', ensureAuthenticated, (req, res) => {
  User.find({username:req.user.username})
    .then(users => {
      res.render('users/settings', {
        users:users
      });
    });
});



//Edit email Form
router.get('/edit/:id', ensureAuthenticated, (req,res)=>{
  //Find one item, not an array
  //pass an obejct with a query
  User.findOne({
    //get the id passed in
    _id: req.params.id
  })
  .then(user =>{
    
      res.render('users/edit',{
        user:user
      });

  });
});

//Edit email process
router.put('/:id', ensureAuthenticated, (req,res)=>{
  User.findOne({
    _id:req.params.id
  })
  .then(user => {
      //console.log (user.email);
    //set a variable called errors to an empty array
    let errors = [];
    
    if(!req.body.email){
      //push on to it with an object with the text of please add an email 
      errors.push({text:'Please add an email.'})
    }    
      
    if(errors.length > 0 ){
      res.render('users/edit',{
        //pass in errors
      errors:errors,
      })
    }else{      
          //Check duplicate emails
          User.findOne({email: req.body.email})
          .then(user => {
            if(user && user.id != req.user.id){
              req.flash('error_msg', 'Email already taken. Failed to update your information');
              res.redirect('/users/settings/');
            }  else { 
                 User.findOne({
                 //get the id passed in
                _id: req.params.id
                 })   
      
      //return a promise
      .then(user => {
        user.email= req.body.email;
        user.save()
        req.flash('success_msg', 'User information updated');
        res.redirect('/users/settings');
                })
            }//end of else after checking duplicate emails
        }); //end of check duplicate emails
    }//end error else
  });
});



//Page for users to add balance
router.get('/addBalance', ensureAuthenticated, (req, res) => {
  User.find({username:req.user.username})
    .then(users => {
      
      res.render('users/addBalance', {
          
          
        users:users
      });
    });
});



//Page for users to add balance
router.get('/addMoney', ensureAuthenticated, (req, res) => {
  User.find({username:req.user.username})
    .then(users => {    
      res.render('users/addMoney', {
        users:users
      });
    });
});



//Process Form
router.post('/', ensureAuthenticated, (req,res) => {
  //In the request object, we can access the body so req.body
  //console.log(req.body);
  //res.send('ok');

  //set a variable called errors to an empty array
  let errors = [];

  //no brandname
  /*if(!req.body.brandname){
    //push on to it with an object with the text of please add a brand name
    errors.push({text:'Please add a brand name.'})
  }*/

  //no shoes name
  if(!req.body.money){
    //push on to it with an object with the text of please add a shoes name
    errors.push({text:'Please add money.'})
  }

if(errors.length > 0){
  //rerender the form
  res.render('users/addMoney',{
    //pass in errors
  errors:errors,
  //don't clear what users put previously
  balance:req.body.balance
  });
}else {
  req.users.bal = (req.users.bal + req.users.money);
  req.user
  .save()
  //return a promise
  //redirect to /shoes page
  .then(shoes => {
    req.flash('success_msg', 'Shoes information added');
    res.redirect('/addBalance');
  })
}

});







// //navbar router (needed for balance)
// router.get('/settings', ensureAuthenticated, (req, res) => {
//   User.find({username:req.user.username})
//     .then(users => {
//       res.render('users/settings', {
//         users:users
//       });
//     });
// });

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
