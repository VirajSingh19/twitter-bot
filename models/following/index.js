const mongoose = require('mongoose');
const followingSchema = require('./schemas');

/**
 * @type {Model}
 */
module.exports = mongoose.model('following', followingSchema);