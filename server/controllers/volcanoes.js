const Volcano = require('../models/volcanoes')

const createVolcano = async ( req, res, next ) => {
    const {id, name, country, region, subregion, last_eruption, summit,
            elevation, population_5km, population_10km, population_30km, 
            population_100km, latitude, longitude } = req.body

    const volcano = Volcano.create({id, name, country, region, subregion, last_eruption, summit,
            elevation, population_5km, population_10km, population_30km, 
            population_100km, latitude, longitude })
}