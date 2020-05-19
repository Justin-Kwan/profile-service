import express = require('express');
import bodyParser = require('body-parser');

import { RequestValidator } from '../../../middleware/rest/RequestValidator';
import { CourierController } from '../../../domain/controllers/CourierController';

const app: express.Application = express();
const courierRouter: express.Router = express.Router();

const courierController: CourierController = new CourierController();
const requestValidator: RequestValidator = new RequestValidator();

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
courierRouter.post('/couriers/:id',
  requestValidator.validateCourierJsonBody,
  courierController.createUser.bind(courierController)
);

courierRouter.put('/couriers/:id',
  requestValidator.validateCourierJsonBody,
  courierController.updateUser.bind(courierController)
);

courierRouter.get('/couriers/:id',
  courierController.getUser.bind(courierController)
);

courierRouter.delete('/couriers/:id',
  courierController.deleteUser.bind(courierController)
);

export { courierRouter };
