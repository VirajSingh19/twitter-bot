const express = require("express");
const app = express.Router();
const route = __dirname + "/routes";
const fs = require("fs");


function importanduse(path) {
    app.use("/",require(path));
}

function importAll(path) {
    let contents = fs.readdirSync(path);
    for(let content of contents) {
        if(content.endsWith(".js")) {
            importanduse(path+"/"+content);
        }else{
            importAll(path+"/"+content);
        }
    }
};

// imports all .js files inside route directory
importAll(route);

module.exports = app;