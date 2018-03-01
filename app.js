//app.js: entry point file
//whenever I install a module like I just did and I want to bring in then I just need to use the required function here.
const express = require ('express');
//bring the handlebars module in 
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport')
const mongoose = require('mongoose');
//Once we bring in Express, and we require it, we need to bring a variable
//We are going to call this app and we are going to set it to the Express function and that's going to basically initialize our application
const bodyParser = require('body-parser');
const app = express(); 

//Load routes
const shoes = require('./routes/shoes');
const users = require('./routes/users');

//Passport Config, bring in passport config file
require('./config/passport')(passport);

//Map global promise - get rid of warning
//In this way, we are using global promises instead of the mongooses live default library which is deprecated 
mongoose.Promise = global.Promise;

//Connect to mongoose and pass in database.
//Start off with local database; barter: name of my database 
mongoose.connect('mongodb://localhost/barter')
//when we use a promise, we need to catch it with .then
//Once we connect, we will get this promise back and we are just going to want that we are connected 
  .then(()=> console.log ('MongoDB Connected ...'))
  //If there is an error what we can do is to remove that semi-colon and say don't catch and then we'll pass in error and we'll set that to console.log the error
  //If they can't connect if something happens, this will fire off and it will log the error
  .catch(err => console.log(err));

  
//Handlebars Middleware
//main is the default layout; layout is a view that wraps around all of other views 
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

/*
//How middleware works
//we now have access to this request in response object
app/use(function(req,res,next){
  console.log(Date.now());
  req.name = 'Mingyue Chen';
  //call the next piece of middleware to run
  next();
});*/

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//middleware for method override
app.use(methodOverride('_method'));

//Express session middleware
app.use(session({
  //secre can be anything we want
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//connect flash
app.use(flash());

//Set some global variables
//Another piece of middleware
app.use(function(req, res, next){
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  //Create error for future, such as user not found
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  //we want to call the next piece of middleware
  next();

});
//Index Route
app.get('/', (req,res)=> {
 // console.log(req.name);
 //By default, handlebars uses the var express uses these views directories so I need to create this
 //1. create a veiws folder
 //2.create a file called index.handlebars
 //3. Inside views folder, create a folder layouts
 //4.Inside layouts folder, create a main.handlebars

 //pass dynamic data in our view
 //pass that into our view

  const title ='Welcome everyone';
  res.render('index',{
    title: title
  }); //send text 'index' to the browser
});

//About Route
app.get('/About', (req,res)=>{
  res.render('about');
});



//Use routes
//Anything that goes to /shoes is going to pertain to that shoes file
app.use('/shoes', shoes );
app.use('/users', users );

const port = 5000; //put a port in a variable

//We are going to take that app and we are going to call the listen method which is basically going to listen on a certain port
//In this listen, we want to pass in our port number which reset to 5000 and then our callback here. We could either do function
//like: app.listen(port, function(){
//});

//or you can do that syntax if you want but I am going to use an arrow function
app.listen(port, () =>{
  console.log(`Server started on port ${port}`);//ES 6 way to do this
  //The above code is equavilant as console.log('Server started on port' + port);
}); 