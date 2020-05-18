"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaValidator = void 0;
const ajv_1 = __importDefault(require("ajv"));
const consumer_schema_json_1 = __importDefault(require("../../api/rest/consumer/consumer-schema.json"));
const courier_schema_json_1 = __importDefault(require("../../api/rest/courier/courier-schema.json"));
class JsonSchemaValidator {
    constructor() {
        this.schemaValidator = new ajv_1.default();
        this.CONSUMER_SCHEMA = 'consumer schema';
        this.COURIER_SCHEMA = 'courier schema';
    }
    async isJsonBodyValid(jsonBody, entitySchema) {
        let jsonSchema = {};
        if (entitySchema === this.CONSUMER_SCHEMA) {
            jsonSchema = consumer_schema_json_1.default;
        }
        else if (entitySchema === this.COURIER_SCHEMA) {
            jsonSchema = courier_schema_json_1.default;
        }
        const isJsonBodyValid = await this.schemaValidator
            .validate(jsonSchema, jsonBody);
        return isJsonBodyValid;
    }
}
exports.JsonSchemaValidator = JsonSchemaValidator;
