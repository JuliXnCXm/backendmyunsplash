//modules
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
// imports
const IndexRouter = require('./routers/IndexRouter');
const { config } = require('./config/index');
const connDB = require('./database/ConnDB');
const UserRouter = require('./routers/UserRouter');
const PhotosRouter = require('./routers/PhotosRouter');

class Server {
    constructor() {
        this.objConn = new connDB();
        this.app = express();
        this.#config();
    }
    #config() {
        //middlewares
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, "storage")));
        console.log('Server is running');
        //creating routes
        const IndexR = new IndexRouter();
        const UserR = new UserRouter();
        const PhotosR = new PhotosRouter();
        //adding routes
        this.app.use(IndexR.router)
        this.app.use(UserR.router);
        this.app.use(PhotosR.router);
        //listening port
        this.app.listen(config.port, () => {
            console.log('server on port', config.port);
        });
    }
}

new Server();