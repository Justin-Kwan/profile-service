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
const requestValidator = new RequestValidator_1.RequestValidator();
/**
 * middleware filters applied to all routes
 */
consumerRouter.use(requestValidator.validateApiKey);
consumerRouter.use(requestValidator.validateRequestContentType);
consumerRouter.use(bodyParser.urlencoded({ extended: true }));
consumerRouter.use(bodyParser.json());
/**
 * consumer profile route definitions
 */
consumerRouter.post('/consumers/:id', requestValidator.validateConsumerJsonBody, consumerController.createUser.bind(consumerController));
consumerRouter.put('/consumers/:id', requestValidator.validateConsumerJsonBody, consumerController.updateUser.bind(consumerController));
consumerRouter.get('/consumers/:id', consumerController.getUser.bind(consumerController));
consumerRouter.delete('/consumers/:id', consumerController.deleteUser.bind(consumerController));
