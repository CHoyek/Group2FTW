//Bring in mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema ({
  //Pass objects with different fields we want
  username:{
    type: String,
    require: true //we want this to be required
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required:true
  },
  date:{
    type:Date,
    default: Date.now
  },
  bal:{
    type: Number,
    default: 2499.99
  }
});
//We are going to create our model and we are going to call it users and it is going to be connected to the user shcema
mongoose.model('users', UserSchema);
