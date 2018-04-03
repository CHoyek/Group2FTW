module.exports = {
  ensureAuthenticated: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg', 'Not Authorized. Please log in.');
    res.redirect('/');
  }//End of ensureAuthenticated
}//End of module.exports
