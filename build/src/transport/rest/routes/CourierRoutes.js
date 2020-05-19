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
const requestValidator = new RequestValidator_1.RequestValidator();
/**
 * middleware filters applied to all routes
 */
courierRouter.use(requestValidator.validateApiKey);
courierRouter.use(requestValidator.validateRequestContentType);
courierRouter.use(bodyParser.urlencoded({ extended: true }));
courierRouter.use(bodyParser.json());
/**
 * courier profile route definitions
 */
courierRouter.post('/couriers/:id', requestValidator.validateCourierJsonBody, courierController.createUser.bind(courierController));
courierRouter.put('/couriers/:id', requestValidator.validateCourierJsonBody, courierController.updateUser.bind(courierController));
courierRouter.get('/couriers/:id', courierController.getUser.bind(courierController));
courierRouter.delete('/couriers/:id', courierController.deleteUser.bind(courierController));
