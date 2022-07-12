const express = require('express');
const router = express.Router();
const Volcano = require('../models/volcanoes')

router.get('/', async function(req, res, next) {
    const volcanoes = await Volcano.find() 

    if(Object.keys(volcanoes) < 1) {
        return res.status(400).json({
            error: true,
            message: "No countries found"
        })
    }
    const countries = {}
    
    volcanoes.forEach(volcano => {
        countries[volcano.country] = 0
    })

    const countriesSorted = Object.keys(countries).sort(function(a, b){
        if(a < b) { return -1; }
        if(a > b) { return 1; }
        return 0;
    })

    return res.status(200).json(countriesSorted)

});

module.exports = router;