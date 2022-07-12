const express = require('express');
const router = express.Router();
const Volcano = require('../models/volcanoes')

router.get('/', async function(req, res, next) {
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
    const volcanoes = await Volcano.find({country: country[0].toUpperCase() + country.slice(1).toLowerCase(), ['population_' + populatedWithin]: {$gt: 0} })
    .select("id name country region subregion -_id")

    console.log(volcanoes.length)

    return res.status(200).json(volcanoes)
  }
  else
  {
    const volcanoes = await Volcano.find({country: country[0].toUpperCase() + country.slice(1).toLowerCase()})
    .select("id name country region subregion -_id")
    
    console.log(volcanoes.length)

    return res.status(200).json(volcanoes)
  }
})


module.exports = router;