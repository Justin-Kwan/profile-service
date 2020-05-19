"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerRouter = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const RequestValidator_1 = require("../../../middleware/rest/RequestValidator");
const ConsumerController_1 = require("../../../domain/controllers/ConsumerController");
const app = express();
const consumerRouter = express.Router();
exports.consumerRouter = consumerRouter;
const consumerController = new ConsumerController_1.ConsumerController();
const requestParamChecker = new RequestValidator_1.RequestValidator();
consumerRouter.use(bodyParser.urlencoded({ extended: true }));
consumerRouter.use(bodyParser.json());
/**
 * api key validation middleware appied to all routes
 */
consumerRouter.use(requestParamChecker.validateApiKey);
/**
 * consumer profile route definitions
 */
consumerRouter.post('/consumers/:id', requestParamChecker.validateConsumerJsonBody, requestParamChecker.validateRequestContent, consumerController.createUser.bind(consumerController));
consumerRouter.put('/consumers/:id', requestParamChecker.validateConsumerJsonBody, requestParamChecker.validateRequestContent, consumerController.updateUser.bind(consumerController));
consumerRouter.get('/consumers/:id', consumerController.getUser.bind(consumerController));
consumerRouter.delete('/consumers/:id', consumerController.deleteUser.bind(consumerController));
