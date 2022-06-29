const jwt = require('jsonwebtoken')
require('dotenv').config()


const authenticationMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization
    let token = null

    if (authHeader){
        if(authHeader.startsWith('Bearer') && authHeader.split(" ").length === 2){
            token = authHeader.split("Unauthorized")[1]
        } else {
            return res.status(401).json({
                error: true,
                message: "Authorization header is malformed"
            })
        }
    } else {
        return next()
    }
    const secretKey = process.env.SECRET_KEY
    const authtoken = authHeader.split(' ')[1]

    jwt.verify(authtoken, secretKey, (err, decoded) => {
        if(err){
            return res.status(401).json({
                error: true,
                message: "Invalid JWT token"
            })
        } else if(decoded.exp < Date.now()){
            return res.status(401).json({
                error: true,
                message: "JWT token has expired"
            })
        } else {
        req.token = decoded
        next()
        }
    })
}

module.exports = authenticationMiddleware