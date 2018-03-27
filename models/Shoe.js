//Bring in mongoose
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const ShoeSchema = new Schema ({
  //Pass objects with different fields we want
  brandname:{
    type: String,
    require: true //we want this to be required
  },
  shoesname:{
    type: String,
    required: true
  },
  price:{
    type: String,
    required: true
  },
  description:{
    type: String,
    required: true
  },
  user:{
    type: String,
    required: true
  },
  date:{
    type:Date,
    default: Date.now
  }
});
//We are going to create our model and we are going to call it ideas and it is going to be connected to the idea shcema
mongoose.model('shoes', ShoeSchema);
