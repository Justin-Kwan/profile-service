"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
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
function initEnvConfigFile() {
    dotenv.config({
        path: '../../../.env'
    });
}
function initRestApiServer() {
    app.use(cors(corsOptions));
    app.use(API_VERSION_PATH, ConsumerRoutes_1.consumerRouter);
    app.use(API_VERSION_PATH, CourierRoutes_1.courierRouter);
}
function startRestApiServer() {
    app.listen(process.env.NODE_PORT, () => {
        console.log('Server started in ' + process.env.NODE_ENV + ' mode');
        console.log('Server started at 127.0.0.1:' + process.env.NODE_PORT);
    });
}
initEnvConfigFile();
initRestApiServer();
startRestApiServer();
