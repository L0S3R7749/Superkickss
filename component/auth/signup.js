const services = require('./authServices')
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('./default/index', { title: 'Signup', body: '../auth/signup', message: req.flash('error')});
});

router.post('/', async (req, res) => {
  const {
    fullname,
    username,
    email,
    phone,
    password,
    confirmPassword
  } = req.body;

  if (password != confirmPassword) {
    req.flash('error', 'Confirm-password does not match!');
    res.redirect('/auth/signup');
  } else {
    const checkExist = await services.findUser({username, email, phone});
  
    if (checkExist) {
      req.flash('error', 'This user already exists!');
      res.redirect('/auth/signup');
    } else {
      const hashpassword = bcrypt.hashSync(password, 10);
      await services.createUser({fullname, username, hashpassword, email, phone});
      res.redirect('/');
    }
  }
});

module.exports = router;
