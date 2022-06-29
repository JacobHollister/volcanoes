require('dotenv').config()
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticationMiddleware = require('../middleware/auth');

router.post('/register', function(req, res, next) {
  const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      error: true,
      message: "Request body incomplete, both email and password are required"
    })
  }

  req.db.from('users')
    .select("*")
    .where("email", "=", email)
    .then((users) => {
    if(users.length > 0){
      return res.status(409).json({
        error: true,
        message: "User already exists"
      })
    } else {
      const saltRounds = 10;
      const hash = bcrypt.hashSync(password, saltRounds)
      req.db.from('users')
        .insert({email, hash})
        .then(() => {
          res.status(201).json({
          message: "User created"
        })
      })
    }
  })
});


router.post('/login', function(req, res, next) {
    const {email, password} = req.body

  if(!email || !password){
    return res.status(400).json({
      error: true,
      message: "Request body incomplete, both email and password are required"
    })
  }

  req.db.from('users')
    .select("*")
    .where("email", "=", email)
    .then((users) => {
      if(users.length === 0){
        return res.status(401).json({
          error: true,
          message: "Incorrect email or password"
        })
      } 

      const user = users[0]
      bcrypt.compare(password, user.hash).then((compared) => {
      
      if( compared ){
        const secretKey = process.env.SECRET_KEY
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
});

router.get('/:email/profile', authenticationMiddleware, function(req, res, next) {
  const {email} = req.params
  
  if(!req.token || req.token.email !== email){
    req.db.from('users')
      .select("email", "firstName", "lastName")
      .where("email", "=", email)
      .then((user) => {
        if(user.length === 0){
          return res.status(404).json({
            error: true,
            message: "User not found"
          })
        } else {
          return res.status(200).json(user[0])
        }
      })
  } else if (req.token.email === email){
    req.db.from('users')
      .select("email", "firstName", "lastName", "dob", "address")
      .where("email", "=", email)
      .then((user) => {
        if(user.length === 0){
          return res.status(404).json({
            error: true,
            message: "User not found"
          })
        } else {
          const {dob} = user[0]
          let newDate
          if(dob){
            newDate = new Date(Date.parse(new Date(dob)) + 24 * 60 * 60 * 1000).toISOString().substring(0, 10)
          } else { 
            newDate = null
          }
          return res.status(200).json({
            ...user[0], dob: newDate
          })
        }
    }) 
  }
});

router.put('/:email/profile', authenticationMiddleware, function(req, res, next) {
  const emailParam = req.params.email
  const {email, firstName, lastName, dob, address} = req.body

  
  if(!req.token)
  {
    return res.status(401).json({
      error: true,
      message: "Authorization header ('Bearer token') not found"
    })
  }   
  else if(req.token.email !== emailParam)
  {
    return res.status(403).json({
      error: true,
      message: "Forbidden"
    })
  } 
  else if(!firstName || !lastName || !dob || !address)
  {
    return res.status(400).json({
      error: true,
      message: "Request body incomplete: firstName, lastName, dob and address are required."
    })
  } 
  else if(typeof firstName !== 'string' || typeof lastName !== 'string' || typeof dob !== 'string' || typeof address !== 'string')
  {
    return res.status(400).json({
      error: true,
      message: "Request body invalid: firstName, lastName and address must be strings only."
    })
  } 
  else if(!dateIsValidDate(dob))
  {
    return res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a real date in format YYYY-MM-DD."
    })
  } 
  else if(Date.parse(new Date()) < new Date(dob))
  {
    return res.status(400).json({
      error: true,
      message: "Invalid input: dob must be a date in the past."
    })
  } 
  else if (req.token.email === emailParam)
  {
    req.db('users')
      .where("email", "=", emailParam)
      .update({address, firstName, lastName, dob, email: emailParam})
      .then(() => {
        req.db.from('users')
          .select("email", "firstName", "lastName", "dob", "address")
          .where("email", "=", emailParam).then((user)=>{
            const {dob} = user[0]
            const newDate = new Date(Date.parse(new Date(dob)) + 24 * 60 * 60 * 1000).toISOString().substring(0, 10)
            console.log(newDate)
            return res.status(200).json({
              ...user[0], dob: newDate
            })
          })
      }).catch((err) => {
        console.log(err)
      })
}

function dateIsValidDate(date) {
  // Check matching input format
  const reg = /^\d{4}-\d{2}-\d{2}$/
  if(!date.match(reg)) return false

  // Check if converts to valid date object
  const dateObject = new Date(date)
  const dateObjectNumber = dateObject.getTime()
  if(!dateObjectNumber && dateObjectNumber !== 0) return false

  // Check if new date object equals oringinal date
  return dateObject.toISOString().slice(0,10) === date
}

});




module.exports = router;
