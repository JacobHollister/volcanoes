const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  country = req.query.country
  populatedWithin = req.query.populatedWithin
  acceptablePopulatedWithin = ["5km", "10km", "30km", "100km"]
  acceptableParams = ['country', 'populatedWithin']
  unacceptableParams = Object.keys(req.query).map(el => acceptableParams.includes(el)).includes(false)

  if(!country || (populatedWithin && !acceptablePopulatedWithin.includes(populatedWithin)) || unacceptableParams){
    return res.status(400).json({
      error: true,
      message: "Country is a required query parameter."
    })
  } 
  else if(acceptablePopulatedWithin.includes(populatedWithin))
  {
  req.db.from('data')
    .select('id',"name", "country", "region", "subregion")
    .where("country", "=", country).andWhere('population_' + populatedWithin, '>', "0")
      .then(rows => {
          return res.status(200).json(rows)
      })
      .catch(err => {
        console.log(err)
        return res.status(400).json({
          error: true,
          message: "Bad request"
        })
      })
  } 
  else 
  {
    req.db.from('data')
      .select('id',"name", "country", "region", "subregion")
      .where("country", "=", country)
    .then(rows => {
        return res.status(200).json(rows)
    })
    .catch(err => {
      console.log(err)
      return res.status(400).json({
        error: true,
        message: "Bad request"
      })
    })
  }
});

module.exports = router;