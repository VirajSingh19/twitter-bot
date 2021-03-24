const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

// my followers 
const followerSchema = new Schema({
    name: { type: String, required: true },
    screen_name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
    followers_count: { type: Number, default: 0 },
    friends_count: { type: Number, default: 0 } // followings

},
    { timestamps: true }
);

followerSchema.plugin(mongoosePaginate);

/**
 * @type {Schema}
 */
module.exports = followerSchema;