const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/auth')

router.get('/:id', authenticationMiddleware, function(req, res, next) {
  id = req.params.id

  if(Object.keys(req.query).length > 0){
    return res.status(400).json({
      error: true,
      message: "Invalid query parameters. Query parameters are not permitted."
    })
  }

  if(req.token)
  {
    req.db.from('data')
      .select('id',"name", "country", "region", "subregion", "last_eruption",
              "summit","latitude","longitude", "elevation","population_5km", 
              "population_10km",  "population_30km",  "population_100km")
      .where("id", "=", id)
        .then(rows => {
          if(rows.length === 0){
            return res.status(404).json({
              error: true,
              message: `Volcano with ID: ${id} not found.`
            })
          } else {
            return res.status(200).json(rows[0])
          }
    })
  } 
  else 
  {
    req.db.from('data')
      .select('id',"name", "country", "region", "subregion", "last_eruption", 
              "summit","latitude","longitude", "elevation" )
      .where("id", "=", id)
        .then(rows => {
          if(rows.length === 0){
            return res.status(404).json({
              error: true,
              message: `Volcano with ID: ${id} not found.`
            })
          } else {
            return res.status(200).json(rows[0])
          }
    })
    .catch(err => {
      console.log("error")
    })
  }
});

module.exports = router;