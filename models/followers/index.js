const mongoose = require('mongoose');
const followerSchema = require('./schemas');

/**
 * @type {Model}
 */
module.exports = mongoose.model('follower', followerSchema);