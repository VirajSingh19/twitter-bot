const _ = require("lodash");
const Response =require("./response");

/**
 * 
 * @param {Object} err - error object
 * @param {Object} req 
 * @param {Object} res 
 * @param {Object} next 
 */
function errorHandler(err, req, res, next) {
    const status = _.get(err,"status",500);
    _.unset(err,"status");
    res.status(status).send(Response.errorResponse(err));
}

module.exports = errorHandler;