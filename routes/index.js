const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

const User = require('../models/User');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    
    user: req.user
  })
  
  );

router.get('/display', function(req, res) {
    console.log('getting all user');
    User.find({})
      .exec(function(err, User) {
        if(err) {
          res.send('error occured')
        } else {
          console.log(User);
         res.render('display',function(req,res){
            user:User;
         })
        }
      });
  });

module.exports = router;
