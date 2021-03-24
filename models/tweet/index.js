const mongoose = require('mongoose');
const tweetSchema = require('./schemas');

/**
 * @type {Model}
 */
module.exports = mongoose.model('tweet', tweetSchema);