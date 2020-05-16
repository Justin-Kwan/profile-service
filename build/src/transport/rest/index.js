"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const cors = require("cors");
const ConsumerRoutes_1 = require("./routes/ConsumerRoutes");
const CourierRoutes_1 = require("./routes/CourierRoutes");
const app = express();
const corsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token'
    ],
    credentials: true,
    methods: 'GET, HEAD, OPTIONS, PUT, PATCH, POST, DELETE',
    // origin: API_URL,
    preflightContinue: false
};
const API_VERSION_PATH = '/v1';
function initRestApiServer() {
    app.use(cors(corsOptions));
    app.use(API_VERSION_PATH, ConsumerRoutes_1.consumerRouter);
    app.use(API_VERSION_PATH, CourierRoutes_1.courierRouter);
}
function startRestApiServer() {
    app.listen(3000, () => {
        console.log('Server started at 127.0.0.1:3000');
    });
}
initRestApiServer();
startRestApiServer();
