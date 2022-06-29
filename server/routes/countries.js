const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
    if(Object.keys(req.query).length > 0){
        return res.status(400).json({
            error: true,
            message: "Invalid query parameters. Query parameters are not permitted."
        })
    }

    req.db.from('data')
        .select('country')
        .then(rows => {
            countries = [...new Set(rows.map(data => data.country).sort())]
            res.status(200).json(countries)
        })

});

module.exports = router;