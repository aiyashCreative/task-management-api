const responseHandler = require("../handlers/responseHandler")
const jwt = require("jsonwebtoken")
const autherization = (req, res, next) => {
    let message = "Authenitcation Failed!"
    let authFaile = false

    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== "undefined") {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        jwt.verify(bearerToken, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                authFaile = true
                message = "Invalid Token"
            } else authFaile = false
        })
    } else {
        authFaile = true
    }

    if (authFaile) responseHandler.authErrorHandler(res, { message })
    else next()
}

module.exports = {
    autherization
}