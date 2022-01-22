module.exports = {
  MAX_USERNAME_LENGTH: 10,
  IP_HEADER: 'X-Envoy-External-Address',
  DRIVER_INIT_TIMEOUT: 10000,
  RESPONSE_MAX_MESSAGES: 10,
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
    MESSAGE_LENGTH_ERROR: { code: 400, message: 'Message length have to be more then 0 chars and less then 128' },
    MESSAGE_ADD_ERROR: { code: 500, message: 'Server Error on user message posting operation' },
    MESSAGE_READ_ERROR: { code: 500, message: 'Server Error on user message reading operation' },
    MESSAGE_NOT_FOUND: { code: 404, message: 'Message not found' },
    GET_USER_NUMBER_ERROR: { code: 503, message: 'Problem on user number count' },
    ACCESS_DENIED: { code: 403, message: 'This user doesn\'t has an access or user is not exist' },
  }
};
