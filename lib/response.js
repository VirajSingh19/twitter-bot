const _ = require("lodash");
const winston = require("../lib/logger");

/**
 * response format for all APIs
 * @param {Object} res - expexted response to be sent 
 * @param {String} detail - expexted detail to be sent
 */
class Response {

    static response(res, detail = '') {
        return {
            isError: false,
            detail: detail,
            result: res
        }
    }


    static errorResponse(err) {
        err = _.isArray(err) ? err[0] : err;
        winston.error(`error ${err.message} ${err.path ? `on ${err.path}` : ``}`);
        const errMessage = {
            isError: true,
            detail: err.detail || JSON.stringify(err.params) || err.name || "Internal_Error",
            result: err.message || "Something went wrong!",
            status: err.status
        }
        return errMessage;
    }

}


module.exports = Response;