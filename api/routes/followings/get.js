const TwitterController = require("../../../controllers/TwitterController")
const RouteUtil = require("../../../lib/routeUtil");

const route = new RouteUtil(RouteUtil.methods.get, "/followings");


const querySchema = {
    type: "object",
    required: ["skip", "limit"],
    properties: {
        skip: { type: "string", format: "numstr" },
        limit: { type: "string", format: "numstr" },
    },
    additionalProperties: false,
};

route.validateQuery(querySchema);

module.exports = route.middleware(async function (req, res, next) {
    try {
        res.json(route.response(await TwitterController.getFollowings(+req.query.skip, +req.query.limit)));
    } catch (err) {
        next(err);
    }
});