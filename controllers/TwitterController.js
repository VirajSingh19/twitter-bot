const FollowersModel = require("../models/followers");
const FollowingsModels = require("../models/following");
const TweetsModel = require("../models/tweet");

const constants = require("../Constants");
const logger = require('../lib/logger');

const Controller = require("./Controller");
const { twitterV1, twitterV2 } = require("../lib/axios");


class TwitterContorller extends Controller {

    /**
     * 
     * @param {number} skip 
     * @param {number} limit 
     * @returns {Object} - { id: string, text: string }
     */
     static async getTweets(offset, limit) {
        try {
            const z = await TweetsModel.paginate({}, { offset, limit });
            return z;
        } catch (err) {
            logger.error('error in fetching tweets from db ' + err.message);
            throw err;
        }
    }

    /**
     * 
     * @param {number} skip 
     * @param {number} limit 
     * @returns {Object} - { id: string, text: string }
     */
     static async getFollowers(offset, limit) {
        try {
            const z = await FollowersModel.paginate({}, { offset, limit });
            return z;
        } catch (err) {
            logger.error('error in fetching followers from db ' + err.message);
            throw err;
        }
    }


     /**
     * 
     * @param {number} skip 
     * @param {number} limit 
     * @returns {Object} - { id: string, text: string }
     */
      static async getFollowings(offset, limit) {
        try {
            const z = await FollowingsModels.paginate({}, { offset, limit });
            return z;
        } catch (err) {
            logger.error('error in fetching followings from db ' + err.message);
            throw err;
        }
    }






    

    /**
     * upserts my followers in db
     * @param {number} cursor 
     */
    static async syncMyFollowers(cursor = -1) {
        try {
            const { data } = await twitterV1.get('followers/list.json', {
                params: {
                    cursor,
                    'screen_name': process.env.MyScreenName,
                    'skip_status': true,
                    'include_user_entities': false
                }
            });

            // at a time atmost 20 followers are fetched
            const promiseArr = data.users && data.users.map(user => FollowersModel.updateOne({ id: user.id }, user, { upsert: true }));

            await Promise.all(promiseArr || []);

            data.users && data.users.map(user => this.syncTweets(user.id));

            // syninc next_cursor if next_cursor !== 0
            if (data.next_cursor) {
                await this.syncMyFollowers(data.next_cursor);
            } else {
                logger.info('synced followers');
            }
        } catch (err) {
            logger.error(`error in sysncing followers ${err.message}`);
            throw err;
        }

    }


    /**
     * upserts my followings in db
     * @param {number} cursor 
     */
    static async syncMyFollowings(cursor = -1) {
        try {

            const { data } = await twitterV1.get('friends/list.json', {
                params: {
                    cursor,
                    'screen_name': process.env.MyScreenName,
                    'skip_status': true,
                    'include_user_entities': false
                }
            });

            // at a time atmost 20 followers are fetched
            const promiseArr = data.users && data.users.map(user => FollowingsModels.updateOne({ id: user.id }, user, { upsert: true }));

            await Promise.all(promiseArr || []);

            // syninc next_cursor if next_cursor !== 0
            if (data.next_cursor) {
                await this.syncMyFollowings(data.next_cursor);
            } else {
                logger.info('synced followings');
            }

        } catch (err) {
            logger.error(`error in sysncing followers ${err.message}`);
            throw err;
        }
    }


    /**
     * userid
     * @param {nummber | string} id 
     */
    static async syncTweets(id) {
        try {
            const { data } = await twitterV2.get(`users/${id}/tweets`);

            // at a time atmost 10 tweets are fetched
            // not fetching all the tweets as it may expire the API limit
            const promiseArr = data.data && data.data.map(user => TweetsModel.updateOne({ id: user.id }, user, { upsert: true }));

            await Promise.all(promiseArr || []);

        } catch (err) {
            logger.error(`error in getting tweets of user ${id} : ${err.message}`)
            throw err;
        }
    }




    static async postRandomTweet() {
        try {

            let status = 'Update from bot'; // if bot has no followers :(

            const [randomFollower] = await FollowingsModels.aggregate([
                { $sample: { size: 1 } },
                {
                    $project: {
                        name: 1
                    }
                }
            ]);

            if (randomFollower && randomFollower.name) {
                status = `${randomFollower.name}, How you doing?`; // if bot has followers :)
            }

            await twitterV1.post(`statuses/update.json`, {
                params: {
                    status
                }
            });

        } catch (err) {
            logger.error(`error in posting status, ${err.message}`)
            throw err;
        }
    }

}

module.exports = TwitterContorller;