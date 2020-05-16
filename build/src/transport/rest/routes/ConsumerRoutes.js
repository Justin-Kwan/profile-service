"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.consumerRouter = void 0;
const express = require("express");
const ConsumerController_1 = require("../../../domain/controllers/ConsumerController");
const app = express();
const consumerRouter = express.Router();
exports.consumerRouter = consumerRouter;
const consumerController = new ConsumerController_1.ConsumerController();
/**
 * route definitions
 */
consumerRouter.route('/consumers/:id').post(consumerController
    .createUser
    .bind(consumerController));
consumerRouter.route('/consumers/:id').put(consumerController
    .updateUser
    .bind(consumerController));
consumerRouter.route('/consumers/:id').get(consumerController
    .getUser
    .bind(consumerController));
consumerRouter.route('/consumers/:id').delete(consumerController
    .deleteUser
    .bind(consumerController));
