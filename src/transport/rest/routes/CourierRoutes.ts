import express = require('express');
const bodyParser = require('body-parser');

import { RequestValidator } from '../../../middleware/rest/RequestValidator';
import { CourierController } from '../../../domain/controllers/CourierController';

const app: express.Application = express();
const courierRouter: express.Router = express.Router();

const courierController: CourierController = new CourierController();
const requestParamChecker: RequestValidator = new RequestValidator();

courierRouter.use(bodyParser.urlencoded({ extended: true }));
courierRouter.use(bodyParser.json());

courierRouter.use(requestParamChecker.validateApiKey);
courierRouter.use(requestParamChecker.validateRequestContent);
courierRouter.use(requestParamChecker.validateCourierJsonBody);

/**
 * courier profile route definitions
 */
courierRouter.route('/couriers/:id').post(
  courierController
  .createUser
  .bind(courierController));

courierRouter.route('/couriers/:id').put(
  courierController
  .updateUser
  .bind(courierController));

courierRouter.route('/couriers/:id').get(
  courierController
  .getUser
  .bind(courierController));

courierRouter.route('/couriers/:id').delete(
  courierController
  .deleteUser
  .bind(courierController));

export { courierRouter };
