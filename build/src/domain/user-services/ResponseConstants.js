"use strict";
/**
 * api standard guideline can be found here:
 * - https://cloud.google.com/apis/design/errors
 * - https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOURCE_NOT_FOUND = exports.RESOURCE_MOBILE_NUM_ALREADY_EXISTS = exports.RESOURCE_EMAIL_ALREADY_EXISTS = exports.RESOURCE_ID_ALREADY_EXISTS = exports.PERMISSION_DENIED = exports.RESOURCE_DELETED = exports.RESOURCE_CREATED = void 0;
/**
 * success response payloads
 */
const RESOURCE_CREATED = {
    body: {},
    code: 201
};
exports.RESOURCE_CREATED = RESOURCE_CREATED;
const RESOURCE_DELETED = {
    body: {},
    code: 204
};
exports.RESOURCE_DELETED = RESOURCE_DELETED;
/**
 * error response payloads
 */
const PERMISSION_DENIED = {
    body: {
        error: {
            message: "Resource access permission is denied",
            details: "Ensure you have the appropriate permissions to access this resource",
        }
    },
    code: 403
};
exports.PERMISSION_DENIED = PERMISSION_DENIED;
const RESOURCE_ID_ALREADY_EXISTS = {
    body: {
        error: {
            message: "Resource with the same id already exists",
            details: "Try checking your resource id",
        }
    },
    code: 409
};
exports.RESOURCE_ID_ALREADY_EXISTS = RESOURCE_ID_ALREADY_EXISTS;
const RESOURCE_EMAIL_ALREADY_EXISTS = {
    body: {
        error: {
            message: "Resource with the same email already exists",
            details: "Try checking your resource email",
        }
    },
    code: 409
};
exports.RESOURCE_EMAIL_ALREADY_EXISTS = RESOURCE_EMAIL_ALREADY_EXISTS;
const RESOURCE_MOBILE_NUM_ALREADY_EXISTS = {
    body: {
        error: {
            message: "Resource with the same mobile number already exists",
            details: "Try checking your resource mobile number"
        }
    },
    code: 409
};
exports.RESOURCE_MOBILE_NUM_ALREADY_EXISTS = RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
const RESOURCE_NOT_FOUND = {
    body: {
        error: {
            message: "Resource not found",
            details: "Try checking your resource id",
        }
    },
    code: 404
};
exports.RESOURCE_NOT_FOUND = RESOURCE_NOT_FOUND;
