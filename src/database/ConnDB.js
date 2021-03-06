const mongoose = require('mongoose');
const { cloud_db }  = require( "../database/urlDB")

class connDB {
    constructor() {
        this.connection()
    }
    connection() {
        console.log('Connecting to database...');
        this.conn =  mongoose.connect( cloud_db , {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log('DB connected')
        }).catch(err => {
            console.log('DB connection error', err)
        })
    }
}

module.exports = connDB;