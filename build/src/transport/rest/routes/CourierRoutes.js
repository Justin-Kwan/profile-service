"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courierRouter = void 0;
const express = require("express");
const bodyParser = require("body-parser");
const RequestValidator_1 = require("../../../middleware/rest/RequestValidator");
const CourierController_1 = require("../../../domain/controllers/CourierController");
const app = express();
const courierRouter = express.Router();
exports.courierRouter = courierRouter;
const courierController = new CourierController_1.CourierController();
const requestParamChecker = new RequestValidator_1.RequestValidator();
courierRouter.use(bodyParser.urlencoded({ extended: true }));
courierRouter.use(bodyParser.json());
/**
 * api key validation middleware appied to all routes
 */
courierRouter.use(requestParamChecker.validateApiKey);
/**
 * courier profile route definitions
 */
courierRouter.post('/couriers/:id', requestParamChecker.validateCourierJsonBody, requestParamChecker.validateRequestContent, courierController.createUser.bind(courierController));
courierRouter.put('/couriers/:id', requestParamChecker.validateCourierJsonBody, requestParamChecker.validateRequestContent, courierController.updateUser.bind(courierController));
courierRouter.get('/couriers/:id', courierController.getUser.bind(courierController));
courierRouter.delete('/couriers/:id', courierController.deleteUser.bind(courierController));
