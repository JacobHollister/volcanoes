require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticationMiddleware = require('../middleware/auth');

const User = require('../models/user')

router.post('/register', async function(req, res, next) {
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      error: true,
      message: "Request body incomplete, both email and password are required"
    })
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) return next(createCustomError('Email already exists', 401))

  const saltRounds = 10;
  const hash = bcrypt.hashSync(password, saltRounds)

  const user = await User.create({ email, pwdHash: hash });

  res.status(201).json({message: "User created"})
});


router.post('/login', async function(req, res, next) {
    const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      error: true,
      message: "Request body incomplete, both email and password are required"
    })
  }

  const users = await User.find({email: email})

  if(users.length === 0){
    return res.status(401).json({
      error: true,
      message: "Incorrect email or password"
    })
  } 

  const user = users[0]
  bcrypt.compare(password, user.pwdHash).then((compared) => {
    
  if( compared ){
    const secretKey = process.env.JWT_SECRET
    const expires_in = parseInt(process.env.TOKEN_EXP)
    const exp = Date.now() + expires_in * 1000
    const token = jwt.sign({email, exp}, secretKey)
    res.status(200).json({
      token_type: "Bearer", 
      token, 
      expires_in
    })
  } else {
      return res.status(401).json({
        error: true,
        message: "Incorrect email or password"
      })
    }

  })
})




module.exports = router;
