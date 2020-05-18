/**
 * api standard guideline can be found here:
 * - https://cloud.google.com/apis/design/errors
 * - https://docs.microsoft.com/en-us/azure/architecture/best-practices/api-design
 */

/**
 * success response payloads
 */
const RESOURCE_CREATED: any = {
  body: undefined,
  code: 201
};

const RESOURCE_DELETED: any = {
  body: undefined,
  code: 204
};

/**
 * error response payloads
 */
const PERMISSION_DENIED: any = {
  body: {
    error: {
      message: 'Resource access permission is denied',
      details: 'Ensure you have the appropriate api keys to access resource',
      status: 'PERMISSION_DENIED'
    }
  },
  code: 403
};

const INVALID_CONTENT_TYPE: any = {
  body: {
    error: {
      message: 'Request has invalid content type',
      details: 'Ensure that your request content type is defined as application/json in your header',
      status: 'INVALID_CONTENT_TYPE'
    }
  },
  code: 400
};

const INVALID_ARGUMENT: any = {
  body: {
    error: {
      message: 'Request has invalid arguments',
      details: 'Ensure that your request arguments correct',
      status: 'INVALID_ARGUMENT'
    }
  },
  code: 400
};

const RESOURCE_ID_ALREADY_EXISTS: any = {
  body: {
    error: {
      message: 'Resource with the same id already exists',
      details: 'Ensure that your resource id is correct',
      status: 'RESOURCE_ID_ALREADY_EXISTS'
    }
  },
  code: 409
};

const RESOURCE_EMAIL_ALREADY_EXISTS: any = {
  body: {
    error: {
      message: 'Resource with the same email already exists',
      details: 'Ensure that your resource email is correct',
      status: 'RESOURCE_EMAIL_ALREADY_EXISTS'
    }
  },
  code: 409
};

const RESOURCE_MOBILE_NUM_ALREADY_EXISTS: any = {
  body: {
    error: {
      message: 'Resource with the same mobile number already exists',
      details: 'Ensure that your resource mobile number is correct',
      status: 'RESOURCE_MOBILE_NUM_ALREADY_EXISTS'
    }
  },
  code: 409
};

const RESOURCE_NOT_FOUND: any = {
  body: {
    error: {
      message: 'Resource not found',
      details: 'Ensure that your resource id is correct',
      status: 'RESOURCE_NOT_FOUND'
    }
  },
  code: 404
};

export {
  RESOURCE_CREATED,
  RESOURCE_DELETED,
  PERMISSION_DENIED,
  INVALID_CONTENT_TYPE,
  INVALID_ARGUMENT,
  RESOURCE_ID_ALREADY_EXISTS,
  RESOURCE_EMAIL_ALREADY_EXISTS,
  RESOURCE_MOBILE_NUM_ALREADY_EXISTS,
  RESOURCE_NOT_FOUND
};
