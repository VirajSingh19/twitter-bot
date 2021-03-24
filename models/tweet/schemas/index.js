const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');
// tweets 
const tweetSchema = new Schema({
    id: { type: String, required: true, unique: true },
    text: { type: String }
},
    { timestamps: true }
);

tweetSchema.plugin(mongoosePaginate);

/**
 * @type {Schema}
 */
module.exports = tweetSchema;