const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.status(200).json({name: "Jacob Hollister", student_number: "n10876596"});
});

module.exports = router;