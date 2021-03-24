const TwitterContorller = require("../controllers/TwitterController");

async function init() {
    await TwitterContorller.syncMyFollowers(); // alse syncs tweets of my followers 
    await TwitterContorller.syncMyFollowings();
    await TwitterContorller.postRandomTweet();
}

module.exports = init;