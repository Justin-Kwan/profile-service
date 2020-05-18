import express = require('express');

import { CourierController } from '../../../domain/controllers/CourierController';

const app: express.Application = express();
const courierRouter: express.Router = express.Router();

const courierController: CourierController = new CourierController();

/**
 * route definitions
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
