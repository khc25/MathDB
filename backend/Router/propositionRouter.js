const express = require('express');

class propositionRouter {
    constructor(service) {
        this.service = service;
    }
    router() {
        let router = express.Router();

        router.get('/', this.get.bind(this));
        router.post('/', this.post.bind(this));

        return router
    }

    get(req, res) {
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

module.exports = propositionRouter