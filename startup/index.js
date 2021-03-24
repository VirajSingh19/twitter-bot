const connectMongo = require("./connectMongo");
const botInit = require("./bot_init");

async function startup() {
    await connectMongo();
    await botInit();
}

module.exports = startup;