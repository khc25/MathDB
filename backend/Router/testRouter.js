const express = require('express');

class textRouter {
    constructor(service) {
        this.service = service;
    }
    router() {
        let router = express.Router();

        //router.anyRESTFUL_API('/params', this.service_n.bind(this));
        router.get('/', this.service_1.bind(this));

        return router
    }

    service_1(req, res) {
        // inside the bucket is get request data
        // There are few method to get data
        // req.body, req.params req.query
        // depends on how front end pass the data(by query? or by params? or by body)
        return this.service.service_1(req.params.id)
            .then((results) => res.json(results))
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = textRouter