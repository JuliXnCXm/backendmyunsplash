const jwt = require('jsonwebtoken');
const { config } = require('../config/index');

class TokenController {
    constructor() {
        this.verifyToken = this.verifyToken.bind(this)
    }

    verifyToken(req, res, next) {
        let token =  this.getToken(req)
        let decode = jwt.decode(token , config.privateKey)
        if (decode != null) {
            next()
        } else {
            res.status(401).send({
                message: 'Token no valido'
            })
        }
    }
    getToken(req, res, next) {
        let token = null
        let authorization = req.headers.authorization
        if (authorization && authorization.split(' ')[0] === 'Bearer') {
            token = authorization.split(' ')[1]
        }
        return token
    }
}

module.exports = TokenController;