const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Load Shoe Model
  //dot means that we are looking in the current directory that we're in. We are in app js, so we are looking in the current directory into models and then we want to look at Shoe (just the name of file, don't need to put js)
  // ../ outside the folder
  require('../models/Shoe');
  //Load the model into a variable 
  const Shoe = mongoose.model('shoes'); //pass the name of the model, which is shoes

//Shoes Index Page
router.get('/', (req,res) => {
  Shoe.find({})
  .sort({data:'desc'})
  //return a promise
  //We can access the reuslts into the shoes variable
  .then(shoes=> {
    res.render('shoes/index', {
      shoes:shoes
    });
  });
  
});
//Upload Shoes Form
router.get('/sell', (req,res)=>{
  res.render('shoes/sell');
});

//Edit Shoes Form
router.get('/edit/:id', (req,res)=>{
  //Find one item, not an array
  //pass an obejct with a query
  Shoe.findOne({
    //get the id passed in
    _id: req.params.id
  })
  .then(shoe =>{
    res.render('shoes/edit',{
      shoe:shoe
    });
  });
});

//Process Form
router.post('/', (req,res) => {
  //In the request object, we can access the body so req.body
  //console.log(req.body);
  //res.send('ok');

  //set a variable called errors to an empty array
  let errors = [];

  //no brandname
  if(!req.body.brandname){
    //push on to it with an object with the text of please add a brand name
    errors.push({text:'Please add a brand name.'})
  }

  //no shoes name
  if(!req.body.shoesname){
    //push on to it with an object with the text of please add a shoes name
    errors.push({text:'Please add a shoes name.'})
  }
   

if(errors.length > 0){
  //rerender the form
  res.render('/sell',{
    //pass in errors
  errors:errors,
  //don't clear what users put previously
  brandname:req.body.brandname,
  shoesname:req.body.shoesname
  });
}else {
  const newUser = {
    brandname: req.body.brandname,
    shoesname: req.body.shoesname
  }
  //Idea comes from line 30: const Idea = mongoose.model('ideas');
  new Shoe(newUser)
  .save()
  //return a promise
  //redirect to /shoes page
  .then(shoes => {
    req.flash('success_msg', 'Shoes information added');
    res.redirect('/shoes');
  })
}

});

//Edit Form process
router.put('/:id', (req,res)=>{
  Shoe.findOne({
    _id:req.params.id
  })
  .then(shoe => {
    //new values
    shoe.brandname = req.body.brandname;
    shoe.shoesname = req.body.shoesname;

    shoe.save()
    //return a promise
    .then(shoe => {
      req.flash('success_msg', 'Shoes information updated');
      res.redirect('/shoes');
    })
  });
});

//Delete Shoe
router.delete('/:id', (req,res)=> {
  Shoe.remove({_id: req.params.id})
  .then(() => {
    req.flash('success_msg', 'Shoes information removed');
    res.redirect('/shoes');
  });
});

module.exports = router;