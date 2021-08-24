module.exports = {
  MAX_USERNAME_LENGTH: 10,
  IP_HEADER: 'X-Envoy-External-Address',
  DRIVER_INIT_TIMEOUT: 10000,
  errors: {
    USER_IS_EXIST: { code: 409, message: 'User with the same name already exist' },
    USER_CHECK_ERROR: { code: 500, message: 'Server Error on user checking operation' },
    INCORRECT_NAME: { code: 400, message: 'You can\'t use this name' },
    USER_CREATE_ERROR: { code: 500, message: 'Server Error on user creating operation' },
    BODY_PARSE_ERROR: { code: 400, message: 'Request body is incorrect' },
    DRIVER_INIT_ERROR: { code: 503, message: 'Database problems, please notify me' },
    ENDPOINT_NOT_FOUND: { code: 404, message: 'Unknown endpoint' },
    USER_NOT_FOUND: { code: 404, message: 'User not found' },
    USER_UPDATE_ERROR: { code: 500, message: 'Server Error on user updating operation' },
  }
};
