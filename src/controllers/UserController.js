const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { config } = require('../config/index');

class UserController  {

    register = (req, res) => {
        let user  = req.body;
        if (user.name && user.lastname  && user.email && user.password) {
            User.create(user, (err, data) => {
                if (!err) {
                    let token = jwt.sign({data},config.privateKey)
                    res.status(201).json({token})
                } else {
                    res.status(500).json({err})
                }
            })
        } else {
            res.status(400).json({err: 'Bad Request -- Missing parameters'})
        }
    }
    login = (req, res) => {
        let {email, password} = req.body;
        if (email && password) {
            User.findOne({email,password}, (err, data) => {
                if(err) {
                    res.status(401).json({err})
                } else {
                    if(data !== null) {
                        let token = jwt.sign({data},config.privateKey)
                        res.status(200).json({token})
                    } else {
                        res.status(401).json({err: 'Credenciales invalidas'})
                    }
                }
            })
        } else {
            res.status(400).json({err: 'Bad Request -- Missing parameters'})
        }
    }
}

module.exports = UserController;