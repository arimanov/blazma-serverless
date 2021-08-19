module.exports = {
  MAX_USERNAME_LENGTH: 10,
  IP_HEADER: 'X-Envoy-External-Address',
  errors: {
    USER_IS_EXIST: { code: 409, message: 'User with the same name already exist' },
    USER_CHECK_ERROR: { code: 500, message: 'Server Error on user checking operation' },
    INCORRECT_NAME: { code: 400, message: 'You can\'t use this name' },
    USER_CREATE_ERROR: { code: 500, message: 'Server Error on user creating operation' },
    BODY_PARSE_ERROR: { code: 400, message: 'Request body is incorrect' }
  }
};
