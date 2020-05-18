"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courierRouter = void 0;
const express = require("express");
const bodyParser = require('body-parser');
const RequestValidator_1 = require("../../../middleware/rest/RequestValidator");
const CourierController_1 = require("../../../domain/controllers/CourierController");
const app = express();
const courierRouter = express.Router();
exports.courierRouter = courierRouter;
const courierController = new CourierController_1.CourierController();
const requestParamChecker = new RequestValidator_1.RequestValidator();
courierRouter.use(bodyParser.urlencoded({ extended: true }));
courierRouter.use(bodyParser.json());
courierRouter.use(requestParamChecker.validateApiKey);
courierRouter.use(requestParamChecker.validateRequestContent);
courierRouter.use(requestParamChecker.validateCourierJsonBody);
/**
 * courier profile route definitions
 */
courierRouter.route('/couriers/:id').post(courierController
    .createUser
    .bind(courierController));
courierRouter.route('/couriers/:id').put(courierController
    .updateUser
    .bind(courierController));
courierRouter.route('/couriers/:id').get(courierController
    .getUser
    .bind(courierController));
courierRouter.route('/couriers/:id').delete(courierController
    .deleteUser
    .bind(courierController));
