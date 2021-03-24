const Ajv = require("ajv");
const ajv = new Ajv();
const express = require("express");
const Response = require("./response");
const ApiErrors = require("./ApiError");
const ajvFormats = require("./addFormat");

ajvFormats.forEach(format =>
    ajv.addFormat(format.name, format.validatingFunction)
);

// cunstructor function
function Route(method, endpoint, authRequired = false) {
    this.method = method;
    this.endpoint = endpoint;
    this.middlewares = []
    this.app = express.Router();
}

// middleware to be called after all validation
Route.prototype.middleware = function (lastMiddleware) {
    switch (this.method) {
        case methods.get:
            return this.app.get(this.endpoint, ...this.middlewares, lastMiddleware);
        case methods.post:
            return this.app.post(this.endpoint, ...this.middlewares, lastMiddleware);
        case methods.put:
            return this.app.put(this.endpoint, ...this.middlewares, lastMiddleware);
    }
};

// middleware to validate req.body
Route.prototype.validateBody = function (schema) {
    this.middlewares.push(function (req, res, next) {
        try {
            validateSchema(schema, req.body);
            next();
        } catch (err) {
            next(err);
        }
    });
};

Route.prototype.validateParams = function (schema) {
    this.middlewares.push(function (req, res, next) {
        try {
            validateSchema(schema, req.params);
            next();
        } catch (err) {
            next(err);
        }
    });
};



// middleware to validate req.body
Route.prototype.validateQuery = function (schema) {
    this.middlewares.push(function (req, res, next) {
        try {
            validateSchema(schema, req.query);
            next();
        } catch (err) {
            next(err);
        }
    });
};

// validated schema
function validateSchema(schema, data) {
    const test = ajv.compile(schema);
    if (test(data)) return;
    let err = test.errors;
    err = err[0];
    err.status = ApiErrors.getStatusCodes()["Bad Request"];
    throw err;
}

// common response formats
Route.prototype.response = Response.response;
// common errors
Route.prototype.ApiErrors = ApiErrors;

module.exports = Route;
const methods = {
    post: "post",
    get: "get",
    put: "put"
    /**
     * Add more methods according to requirement
     */
};
module.exports.methods = methods;