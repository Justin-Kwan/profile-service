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
/**
 * api key validation middleware appied to all routes
 */
courierRouter.use(requestParamChecker.validateApiKey);
/**
 * courier profile route definitions
 */
/**
 * @swagger
 * /couriers/{id}
 *   post:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The user id
 *     summary: Creates a new courier user by id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 required: true
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 required: true
 *                 minLength: 8
 *               country:
 *                 type: string
 *                 required: true
 *                 enum: [Canada, United States]
 *               locationId:
 *                 type: string
 *                 required: true
 *               mobileNum:
 *                 type: string
 *                 required: true
 *               vehicleType:
 *                 type: string
 *                 required: true
 *                 enum: [Motor Vehicle, Bicycle Vehicle, On Foot]
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
 *       400:
 *         description: Invalid content type in header (not application/json)
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Request has invalid content type'
 *                details:
 *                  type: string
 *                  default: 'Ensure that the request content type is defined as application/json in your header'
 *                status:
 *                  type: string
 *                  default: 'INVALid_CONTENT_TYPE'
 *       400:
 *         description: Invalid request body arguments
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Request has invalid arguments'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your request arguments are correct'
 *                status:
 *                  type: string
 *                  default: 'INVALid_ARGUMENT'
 *       409:
 *         description: Courier user with same id already exists
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource with the same id already exists'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource id is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_id_ALREADY_EXISTS'
 *       409:
 *         description: Courier user with same email already exists
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource with the same email already exists'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource email is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_EMAIL_ALREADY_EXISTS'
 *       409:
 *         description: Courier user with same mobile number already exists
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource with the same mobile number already exists'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource mobile number is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_MOBILE_NUM_ALREADY_EXISTS'
 *       201:
 *         description: Courier user created successfully
 *         schema:
 *           type: integer
 *           nullable: true
 */
courierRouter.post('/couriers/:id', requestParamChecker.validateCourierJsonBody, requestParamChecker.validateRequestContent, courierController.createUser.bind(courierController));
/**
 * @swagger
 * /couriers/{id}
 *   put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The user id
 *     summary: Updates a courier user by id
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 required: true
 *                 minLength: 1
 *               lastName:
 *                 type: string
 *                 required: true
 *                 minLength: 1
 *               email:
 *                 type: string
 *                 required: true
 *                 minLength: 8
 *               country:
 *                 type: string
 *                 required: true
 *                 enum: [Canada, United States]
 *               locationId:
 *                 type: string
 *                 required: true
 *               mobileNum:
 *                 type: string
 *                 required: true
 *               vehicleType:
 *                 type: string
 *                 required: true
 *                 enum: [Motor Vehicle, Bicycle Vehicle, On Foot]
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
 *       400:
 *         description: Invalid content type in header (not application/json)
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Request has invalid content type'
 *                details:
 *                  type: string
 *                  default: 'Ensure that the request content type is defined as application/json in your header'
 *                status:
 *                  type: string
 *                  default: 'INVALid_CONTENT_TYPE'
 *       400:
 *         description: Invalid request body arguments
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Request has invalid arguments'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your request arguments are correct'
 *                status:
 *                  type: string
 *                  default: 'INVALid_ARGUMENT'
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
 *       409:
 *         description: Courier user with same email already exists
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource with the same email already exists'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource email is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_EMAIL_ALREADY_EXISTS'
 *       409:
 *         description: Courier user with same mobile number already exists
 *         schema:
 *          type: object
 *          properties:
 *            error:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  default: 'Resource with the same mobile number already exists'
 *                details:
 *                  type: string
 *                  default: 'Ensure that your resource mobile number is correct'
 *                status:
 *                  type: string
 *                  default: 'RESOURCE_MOBILE_NUM_ALREADY_EXISTS'
 *       200:
 *         description: Courier returned successfully
 *         schema:
 *           type: object
 *           properties:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               locationId:
 *                 type: string
 *               mobileNum:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               verificationStatus:
 *                 type: boolean
 */
courierRouter.put('/couriers/:id', requestParamChecker.validateCourierJsonBody, requestParamChecker.validateRequestContent, courierController.updateUser.bind(courierController));
/**
 * @swagger
 * /couriers/{id}
 *   get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           description: The user id
 *     summary: Gets a courier user by id
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
 *       200:
 *         description: Courier returned successfully
 *         schema:
 *           type: object
 *           properties:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               country:
 *                 type: string
 *               locationId:
 *                 type: string
 *               mobileNum:
 *                 type: string
 *               vehicleType:
 *                 type: string
 *               verificationStatus:
 *                 type: boolean
 */
courierRouter.get('/couriers/:id', courierController.getUser.bind(courierController));
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
courierRouter.delete('/couriers/:id', courierController.deleteUser.bind(courierController));
