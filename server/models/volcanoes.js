const mongoose = require('mongoose')

const VolcanoSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },
    region:{
        type: String,
        required: true
    },
    subregion:{
        type: String,
        required: true
    },
    last_eruption:{
        type: String,
        required: true
    },
    summit:{
        type: Number,
        required: true
    },
    elevation:{
        type: Number,
        required: true
    },
    population_5km:{
        type: Number,
        required: true
    },
    population_10km:{
        type: Number,
        required: true
    },
    population_30km:{
        type: Number,
        required: true
    },
    population_100km:{
        type: Number,
        required: true
    },
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Volcano', VolcanoSchema)