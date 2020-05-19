"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidator = void 0;
require('custom-env').env(true);
const JsonSchemaValidator_1 = require("../../utilities/schema-validators/JsonSchemaValidator");
const ResponseConstants_1 = require("../../constants/ResponseConstants");
// todo: check location id
class RequestValidator {
    validateApiKey(req, res, next) {
        if (req.headers['api-key'] !== process.env.API_KEY) {
            res.status(ResponseConstants_1.PERMISSION_DENIED.code);
            res.send(ResponseConstants_1.PERMISSION_DENIED.body);
        }
        else
            next();
    }
    validateRequestContentType(req, res, next) {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(ResponseConstants_1.INVALID_CONTENT_TYPE.code);
            res.send(ResponseConstants_1.INVALID_CONTENT_TYPE.body);
        }
        else
            next();
    }
    async validateConsumerJsonBody(req, res, next) {
        const jsonSchemaValidator = new JsonSchemaValidator_1.JsonSchemaValidator();
        const isJsonBodyValid = await jsonSchemaValidator
            .isJsonBodyValid(req.body, 'consumer schema');
        if (!isJsonBodyValid) {
            res.status(ResponseConstants_1.INVALID_ARGUMENT.code);
            res.send(ResponseConstants_1.INVALID_ARGUMENT.body);
        }
        else
            next();
    }
    async validateCourierJsonBody(req, res, next) {
        const jsonSchemaValidator = new JsonSchemaValidator_1.JsonSchemaValidator();
        const isJsonBodyValid = await jsonSchemaValidator
            .isJsonBodyValid(req.body, 'courier schema');
        if (!isJsonBodyValid) {
            res.status(ResponseConstants_1.INVALID_ARGUMENT.code);
            res.send(ResponseConstants_1.INVALID_ARGUMENT.body);
        }
        else
            next();
    }
}
exports.RequestValidator = RequestValidator;
