const mongoose = require("mongoose");
const _ = require('lodash');
module.exports = [
    {
        name: "objectId", validatingFunction: (data) => {
            return mongoose.Types.ObjectId.isValid(data);
        }
    },
    {
        name: "numstr", validatingFunction: (data) => {
            return _.isString(data) && Number.isInteger(+data);
        }
    }
]