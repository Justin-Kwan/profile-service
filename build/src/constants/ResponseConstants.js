"use strict";
/**
 * api standard guideline can be found here:
 * - https://cloud.google.com/apis/design/errors
 * - https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOURCE_NOT_FOUND = exports.RESOURCE_MOBILE_NUM_ALREADY_EXISTS = exports.RESOURCE_EMAIL_ALREADY_EXISTS = exports.RESOURCE_ID_ALREADY_EXISTS = exports.INVALID_ARGUMENT = exports.INVALID_CONTENT_TYPE = exports.PERMISSION_DENIED = exports.RESOURCE_DELETED = exports.RESOURCE_CREATED = void 0;
/**
 * success response payloads
 */
const HEALTH_CHECK_OK = {
    body: {
        message: 'Profile service is online',
        status: 'HEALTH_CHECK_OK'
    },
    code: 200
};
const RESOURCE_CREATED = {
    body: undefined,
    code: 201
};
exports.RESOURCE_CREATED = RESOURCE_CREATED;
const RESOURCE_DELETED = {
    body: undefined,
    code: 204
};
exports.RESOURCE_DELETED = RESOURCE_DELETED;
/**
 * error response payloads
 */
const PERMISSION_DENIED = {
    body: {
        error: {
            message: 'Resource access permission is denied',
            details: 'Ensure you have the appropriate api keys to access resource',
            status: 'PERMISSION_DENIED'
        }
    },
    code: 403
};
exports.PERMISSION_DENIED = PERMISSION_DENIED;
const INVALID_CONTENT_TYPE = {
    body: {
        error: {
            message: 'Request has invalid content type',
            details: 'Ensure that the request content type is defined as application/json in your header',
            status: 'INVALID_CONTENT_TYPE'
        }
    },
    code: 400
};
exports.INVALID_CONTENT_TYPE = INVALID_CONTENT_TYPE;
const INVALID_ARGUMENT = {
    body: {
        error: {
            message: 'Request has invalid arguments',
            details: 'Ensure that your request arguments are correct',
            status: 'INVALID_ARGUMENT'
        }
    },
    code: 400
};
exports.INVALID_ARGUMENT = INVALID_ARGUMENT;
const RESOURCE_ID_ALREADY_EXISTS = {
    body: {
        error: {
            message: 'Resource with the same id already exists',
            details: 'Ensure that your resource id is correct',
            status: 'RESOURCE_ID_ALREADY_EXISTS'
        }
    },
    code: 409
};
exports.RESOURCE_ID_ALREADY_EXISTS = RESOURCE_ID_ALREADY_EXISTS;
const RESOURCE_EMAIL_ALREADY_EXISTS = {
    body: {
        error: {
            message: 'Resource with the same email already exists',
            details: 'Ensure that your resource email is correct',
            status: 'RESOURCE_EMAIL_ALREADY_EXISTS'
        }
    },
    code: 409
};
exports.RESOURCE_EMAIL_ALREADY_EXISTS = RESOURCE_EMAIL_ALREADY_EXISTS;
const RESOURCE_MOBILE_NUM_ALREADY_EXISTS = {
    body: {
        error: {
            message: 'Resource with the same mobile number already exists',
            details: 'Ensure that your resource mobile number is correct',
            status: 'RESOURCE_MOBILE_NUM_ALREADY_EXISTS'
        }
    },
    code: 409
};
exports.RESOURCE_MOBILE_NUM_ALREADY_EXISTS = RESOURCE_MOBILE_NUM_ALREADY_EXISTS;
const RESOURCE_NOT_FOUND = {
    body: {
        error: {
            message: 'Resource not found',
            details: 'Ensure that your resource id is correct',
            status: 'RESOURCE_NOT_FOUND'
        }
    },
    code: 404
};
exports.RESOURCE_NOT_FOUND = RESOURCE_NOT_FOUND;
