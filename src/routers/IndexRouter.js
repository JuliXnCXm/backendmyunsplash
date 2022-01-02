const { Router } = require( "express" )


class IndexRouter {
    constructor( ) {
        this.router = Router()
        this.#config()
    }
    #config() {
        this.router.get( "/", ( req, res ) => {
            res.status(200).json({meddage: "Hello from the API"})
        })
    }
}

module.exports = IndexRouter;