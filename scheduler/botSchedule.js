const TwitterContorller = require("../controllers/TwitterController");
const CronJob = require('cron').CronJob;
const {cron : {every30min}} = require("../Constants");

new CronJob(every30min,  async function () {
    await TwitterContorller.syncMyFollowers(); // alse syncs tweets of my followers 
    await TwitterContorller.syncMyFollowings();
    await TwitterContorller.postRandomTweet();
}, null, true);

module.exports = CronJob;