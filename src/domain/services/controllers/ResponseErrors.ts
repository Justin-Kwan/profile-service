/**
 * api standard guideline can be found here:
 * - https://cloud.google.com/apis/design/errors
 * - https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design
 */

const PERMISSION_DENIED: string = JSON.stringify({
  error: {
    message: "Resource access permission is denied",
    details: "Ensure you have the appropriate permissions to access this resource",
    code: 403
  }
});

const RESOURCE_WITH_ID_ALREADY_EXISTS: string = JSON.stringify({
  error: {
    message: "Resource with the same id already exists",
    details: "Try checking your resource id",
    code: 409
  }
});

const RESOURCE_WITH_EMAIL_ALREADY_EXISTS: string = JSON.stringify({
  error: {
    message: "Resource with the same email already exists",
    details: "Try checking your resource email",
    code: 409
  }
});

const RESOURCE_WITH_MOBILE_NUM_ALREADY_EXISTS: string = JSON.stringify({
  error: {
    message: "Resource with the same mobile number already exists",
    details: "Try checking your resource mobile number",
    code: 409
  }
});

const RESOURCE_NOT_FOUND: string = JSON.stringify({
  error: {
    message: "Resource not found",
    details: "Try checking your resource id",
    code: 404
  }
});

export {
  PERMISSION_DENIED,
  RESOURCE_WITH_ID_ALREADY_EXISTS,
  RESOURCE_WITH_EMAIL_ALREADY_EXISTS,
  RESOURCE_WITH_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
};
