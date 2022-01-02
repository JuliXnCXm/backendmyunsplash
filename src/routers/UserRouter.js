const {Router} = require('express');
const UserController = require('../controllers/UserController');

class UserRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        const userC = new UserController();
        this.router.post('/register', userC.register);
        this.router.post('/login', userC.login);
    }
}

module.exports = UserRouter;