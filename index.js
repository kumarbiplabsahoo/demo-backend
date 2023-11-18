const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const http = require("http");
// const https = require("https");
const mongoose = require("mongoose");
// const fs = require("fs");

const { rateLimit } = require("express-rate-limit");
var logger = require("morgan");

const keys = require("./keys/key");
const app = express();


require("dotenv").config();
// console.log(newArr(),' is');
const port = process.env.port || 3000;

mongoose.Promise = global.Promise;

mongoose.connect(keys.mongoURI)
    .then(() => {
        console.log('Mongoose connected successfully');
        // Add your additional logic or start your server here
    })
    .catch((error) => {
        console.error('Mongoose connection error:', error);
    });


// mongoose.plugin(accessibleRecordsPlugin);

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
// ADDING RATE LIMITER TO ALL THE REQUESTS.
app.use(limiter);

app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }))
    .use(bodyParser.json({ limit: "50mb" }))
    .use(cors({ "Access-Control-Allow-Origin": "*" }));
logger.token("body", (req, res) => JSON.stringify(req.body));
app.use(logger("tiny"));

require("./routes/index.route")(app);

const server = http.createServer(app);

server.listen(port, () => {
    console.log("Server is running on Port: " + port);
});
