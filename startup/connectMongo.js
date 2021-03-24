const winston = require("../lib/logger");
const mongoose = require("mongoose");
mongoose.Promise = Promise;
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

async function connectMongo() {
    return new Promise((res, rej) => {
        mongoose.connect(process.env.mongoUrl, { dbName: process.env.dbName, user: process.env.dbuser, pass: process.env.dbpass, useNewUrlParser: true, useUnifiedTopology: true });
        var db = mongoose.connection;
        db.on("error", (err) => {
            winston.info("mongo connect error");
            rej(err);
        });
        db.once("open", function callback() {
            winston.info("mongo connected")
            res();
        });
    })
}

module.exports = connectMongo;
