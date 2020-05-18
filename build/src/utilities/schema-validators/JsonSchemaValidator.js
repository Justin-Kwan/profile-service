"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonSchemaValidator = void 0;
const ajv_1 = __importDefault(require("ajv"));
class JsonSchemaValidator {
    constructor(jsonSchemaFilePath) {
        this.schemaValidator = new ajv_1.default();
        this.jsonSchema = {};
        this.jsonSchema = require(jsonSchemaFilePath);
    }
    async isJsonBodyValid(jsonBody) {
        const isJsonBodyValid = await this.schemaValidator
            .validate(this.jsonSchema, jsonBody);
        return isJsonBodyValid;
    }
}
exports.JsonSchemaValidator = JsonSchemaValidator;
