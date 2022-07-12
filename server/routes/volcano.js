const express = require('express');
const router = express.Router();
const authenticationMiddleware = require('../middleware/auth')

const Volcano = require('../models/volcanoes')

// router.post('/', (req, res, next) => {
//       console.log(req.body)
//       const {id, name, country, region, subregion, last_eruption, summit,
//             elevation, population_5km, population_10km, population_30km, 
//             population_100km, latitude, longitude } = req.body

//     const volcano = Volcano.create({id, name, country, region, subregion, last_eruption, summit,
//             elevation, population_5km, population_10km, population_30km, 
//             population_100km, latitude, longitude })
// })

router.get('/:id', authenticationMiddleware, async function(req, res, next) {
    id = req.params.id

    if(Object.keys(req.query).length > 0){
        return res.status(400).json({
        error: true,
        message: "Invalid query parameters. Query parameters are not permitted."
        })
    }
    
    let volcano

    if(req.token){
        console.log("token found")
        volcano = await Volcano.find({id: id})
    } else {
        volcano = await Volcano.find({id: id})
        .select('id name country region subregion last_eruption summit elevation longitude latitude -_id')
    }
    
    if(Object.keys(volcano) === 0){
        return res.status(404).json({
            error: true,
            message: `Volcano with ID: ${id} not found.`
        })
    } else {
        return res.status(200).json(volcano[0])
    }

})



module.exports = router;