require('custom-env').env(true);
import {
  Request,
  Response
} from 'express';

import { JsonSchemaValidator } from '../../utilities/schema-validators/JsonSchemaValidator';
import {
  PERMISSION_DENIED,
  INVALID_CONTENT_TYPE,
  INVALID_ARGUMENT
} from '../../constants/ResponseConstants';

// todo: check location id

class RequestValidator {

  validateApiKey(req: Request, res: Response, next: () => any) {
    if (req.headers['api-key'] !== process.env.API_KEY!) {
      res.status(PERMISSION_DENIED.code)
      res.send(PERMISSION_DENIED.body);
    }
    else next();
  }

  validateRequestContentType(req: Request, res: Response, next: () => any) {
    if (req.headers['content-type'] !== 'application/json') {
      res.status(INVALID_CONTENT_TYPE.code)
      res.send(INVALID_CONTENT_TYPE.body);
    }
    else next();
  }

  async validateConsumerJsonBody(req: Request, res: Response, next: () => any) {
    const jsonSchemaValidator: JsonSchemaValidator =
      new JsonSchemaValidator();

    const isJsonBodyValid: boolean = await jsonSchemaValidator
      .isJsonBodyValid(req.body, 'consumer schema');

    if (!isJsonBodyValid) {
      res.status(INVALID_ARGUMENT.code)
      res.send(INVALID_ARGUMENT.body);
    }
    else next();
  }

  async validateCourierJsonBody(req: Request, res: Response, next: () => any) {
    const jsonSchemaValidator: JsonSchemaValidator =
      new JsonSchemaValidator();

    const isJsonBodyValid: boolean = await jsonSchemaValidator
      .isJsonBodyValid(req.body, 'courier schema');

    if (!isJsonBodyValid) {
      res.status(INVALID_ARGUMENT.code)
      res.send(INVALID_ARGUMENT.body);
    }
    else next();
  }

}

export { RequestValidator };
