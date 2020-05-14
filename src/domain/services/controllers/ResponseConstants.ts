/**
 * api standard guideline can be found here:
 * - https://cloud.google.com/apis/design/errors
 * - https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design
 */

/**
 * success response payloads
 */
const RESOURCE_CREATED: string = JSON.stringify({
  body: {},
  code: 201
});

const RESOURCE_UPDATED: string = JSON.stringify({
  body: {},
  code: 201
});

const RESOURCE_DELETED: string = JSON.stringify({
  body: {},
  code: 204
});

/**
 * error response payloads
 */
const PERMISSION_DENIED: string = JSON.stringify({
  body: {
    error: {
      message: "Resource access permission is denied",
      details: "Ensure you have the appropriate permissions to access this resource",
      code: 403
    }
  },
  code: 403
});

const RESOURCE_ID_ALREADY_EXISTS: string = JSON.stringify({
  body: {
    error: {
      message: "Resource with the same id already exists",
      details: "Try checking your resource id",
      code: 409
    }
  },
  code: 409
});

const RESOURCE_EMAIL_ALREADY_EXISTS: string = JSON.stringify({
  body: {
    error: {
      message: "Resource with the same email already exists",
      details: "Try checking your resource email",
      code: 409
    }
  },
  code: 409
});

const RESOURCE_MOBILE_NUM_ALREADY_EXISTS: string = JSON.stringify({
  body: {
    error: {
      message: "Resource with the same mobile number already exists",
      details: "Try checking your resource mobile number",
      code: 409
    }
  },
  code: 409
});

const RESOURCE_NOT_FOUND: string = JSON.stringify({
  body: {
    error: {
      message: "Resource not found",
      details: "Try checking your resource id",
      code: 404
    }
  },
  code: 404
});

export {
  RESOURCE_CREATED,
  RESOURCE_UPDATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
};
