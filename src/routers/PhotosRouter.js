const { Router } = require('express');
const upload = require('../libs/Storage');
const photoController = require('../controllers/PhotosController');

class PhotosRouter {
    constructor() {
        this.router = Router();
        this.#config();
    }
    #config() {
        const photoC = new photoController();
        this.router.get('/photos/:photoname', photoC.getPhoto);
        this.router.get('/photos', photoC.getAllPhotos);
        this.router.post('/upload', upload.single('file') ,photoC.uploadPhoto)
        this.router.delete('/photos/:photoname', photoC.deletePhoto)
    }
}

module.exports = PhotosRouter;