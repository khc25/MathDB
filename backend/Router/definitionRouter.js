const express = require('express');

class definitionRouter {
    constructor(service) {
        this.service = service;
    }
    router() {
        let router = express.Router();

        //router.anyRESTFUL_API('/params', this.service_n.bind(this));
        router.get('/', this.get.bind(this));
        router.post('/', this.post.bind(this));

        return router
    }

    get(req, res) {
        // inside the bucket is get request data
        // There are few method to get data
        // req.body, req.params req.query
        // depends on how front end pass the data(by query? or by params? or by body)
        return this.service.get()
            .then((results) => res.json(results))
            .catch((err) => res.status(500).json(err));
    }

    post(req, res) {
        return this.service.post(req.body)
            .then((results) => res.json(results))
            .catch((err) => res.status(500).json(err));

    }
}

module.exports = definitionRouter