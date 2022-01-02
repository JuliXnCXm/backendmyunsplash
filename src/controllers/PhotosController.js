const Photo = require( "../models/Photo" );
const TokenController = require( "../controllers/TokenController" );
const jwt = require("jsonwebtoken");
const path = require("path");
const {config} = require("../config/index");
const fs = require("fs");

class PhotosController {
    constructor() {
        this.objToken = new TokenController();
    }
    getAllPhotos=  (req, res) => {
        Photo.find({}, (err, photos) => {
            if (!err) {
                res.json({
                    ok: true,
                    photos
            })} else {
                res.status(500).json({
                    ok: false,
                    err
                });
            };
        }).sort({created:-1});
    }

    getPhoto = async (req, res) => {
        let {photoname} = req.params;
        console.log(photoname);
        const photo = await Photo.find({photoname: photoname});

        res.sendFile(path.join(__dirname, `/../storage/img/${photoname}`));
    }

    uploadPhoto = (req, res) => {
        let decode = jwt.decode(this.objToken.getToken(req), config.privateKey)
        let formContent = JSON.parse(req.body.fileForm)

        let path = ''
        if (req.file !== undefined) {
            path = `${config.url}/photos/${formContent.label}.${req.file.mimetype.split('/')[1]}`;
        } else {
            path = formContent.photourl;
        }
        Photo.create({
            photoname: formContent.label,
            path: path,
            created: Date.now(),
            user_id: decode.data._id
        }, (err, photo) => {
            if(!err) {
                photo.save();
                res.status(201).json({message: "photo added", photo})
            } else {
                res.status(500).json({message: "error", err})
            }
        })
    }

    deletePhoto = (req, res) => {
        let decode = jwt.decode(this.objToken.getToken(req),config.privateKey);
        let {photoname} = req.params;

        if (decode.data._id === req.body.photo.user_id && decode.data.password === req.body.password) {
            Photo.findOneAndDelete({photoname: photoname}, (err, photo) => {
                if(!err) {
                    fs.unlink(path.join(__dirname , `/../storage/img/${photoname}.jpeg`), (err) => { console.log(err) });
                    res.status(200).json({message: "photo deleted", photo})
                } else {
                    res.status(500).json({message: "error", err})
                }
            })
        } else {
            res.status(401).json({message: "unauthorized"})
        }
    }
}

module.exports = PhotosController;