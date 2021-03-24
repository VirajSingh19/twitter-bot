const express = require("express");
const cors = require("cors");
require('dotenv').config()

const schedule = require("./scheduler");
const startup = require("./startup/");
const api = require("./api/app");
const logger = require("./lib/logger");

const app = express();

app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', async (req, res) => {

    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(`
      <html>
         <head>
           <title>Twitter bot</title>
         </head>
        <body>
          <a href="/api/tweets?skip=0&limit=10" target="_blank">Followings</a> <br/>
          <a href="/api/followers?skip=0&limit=10" target="_blank">Followers</a> <br/>
          <a href="/api/followings?skip=0&limit=10" target="_blank">Tweets</a>
        </body>
      </html>
    `));

});
app.use('/api', api);


// error handling middleware
app.use(require("./lib/errorHandler"));


app.listen(process.env.PORT, async () => {
    await startup();
    logger.info('Sever running at ' + process.env.port);
})

// process did catch
process
    .on('unhandledRejection', (reason, p) => {
        logger.error('Unhandled Rejection for ' + reason);
    })
    .on('uncaughtException', err => {
        logger.error('Uncaught Exception thrown ' + err.message);
        process.exit(1);
    });