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

/**
 * api key validation middleware appied to all routes
 */
courierRouter.use(requestParamChecker.validateApiKey);

/**
 * courier profile route definitions
 */
courierRouter.post('/couriers/:id',
  requestParamChecker.validateCourierJsonBody,
  requestParamChecker.validateRequestContent,
  courierController.createUser.bind(courierController)
);

courierRouter.put('/couriers/:id',
  requestParamChecker.validateCourierJsonBody,
  requestParamChecker.validateRequestContent,
  courierController.updateUser.bind(courierController)
);

courierRouter.get('/couriers/:id',
  courierController.getUser.bind(courierController)
);

courierRouter.delete('/couriers/:id',
  courierController.deleteUser.bind(courierController)
);

export { courierRouter };
