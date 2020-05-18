"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(true);
const express = require("express");
const cors = require("cors");
const ConsumerRoutes_1 = require("./transport/rest/routes/ConsumerRoutes");
const CourierRoutes_1 = require("./transport/rest/routes/CourierRoutes");
const app = express();
/**
 * rest api config constants
 */
const API_VERSION_PATH = '/v1';
const corsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET, PUT, POST, DELETE',
    // origin: API_URL,
    preflightContinue: false
};
function initRestApiServer() {
    app.use(cors(corsOptions));
    app.use(API_VERSION_PATH, ConsumerRoutes_1.consumerRouter);
    app.use(API_VERSION_PATH, CourierRoutes_1.courierRouter);
}
function startRestApiServer() {
    module.exports = app.listen(process.env.NODE_PORT, () => {
        console.log('Profile service started in ' + process.env.NODE_ENV + ' mode');
        console.log('Profile service started at 127.0.0.1:' + process.env.NODE_PORT);
    });
}
initRestApiServer();
startRestApiServer();
