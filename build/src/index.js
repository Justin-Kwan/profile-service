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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
/**
 * @swagger
 * /couriers/{id}
 *   delete:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The user id
 *     summary: Deletes a courier user by id
 *     responses:
 *       403:
 *         description: Permission denied (invalid api key)
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource access permission is denied'
 *                details:
 *                  type: string
 *                  default: 'Ensure you have the appropriate api keys to access resource'
 *                status:
 *                  type: string
 *                  default: 'PERMISSION_DENIED'
 *       404:
 *         description: Courier user with given id is not found
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource not found'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource id is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_NOT_FOUND'
 *       204:
 *         description: Courier deleted successfully
 *         schema:
 *           type: integer
 *           nullable: true
 */
app.delete('/couriers/:id', (req, res) => {
    res.send("hello");
});
function initRestApiServer() {
    app.use(cors(corsOptions));
    app.use(API_VERSION_PATH, ConsumerRoutes_1.consumerRouter);
    app.use(API_VERSION_PATH, CourierRoutes_1.courierRouter);
}
function startRestApiServer() {
    app.listen(process.env.NODE_PORT, () => {
        console.log('Profile service started in ' + process.env.NODE_ENV + ' mode');
        console.log('Profile service started at 127.0.0.1:' + process.env.NODE_PORT);
    });
}
initRestApiServer();
startRestApiServer();
