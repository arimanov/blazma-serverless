import { getAPIStatus, requestUserAuth } from '../utils/httpService';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const LOGOUT_REQUEST = 'logout/request';
export const LOGOUT_SUCCESS = 'logout/success';
export const LOGOUT_FAILURE = 'logout/failure';

const initialState = {
  userName: null,
  userToken: null,
  language: 'en',
  messages: [],
  requestStatuses: {
    isActiveLoginRequest: false,
    errorLoginRequest: null,
  }
};

export default (state = initialState, action) => {

  const { type, payload } = action;

  switch (type) {
    case LOGIN_REQUEST:
      return { ...state, requestStatuses: { ...state.requestStatuses, isActiveLoginRequest: true, errorLoginRequest: null } };
    case LOGIN_SUCCESS:
      const { userName, userToken } = payload;
      return { ...state, userName, userToken, requestStatuses: { ...state.requestStatuses, isActiveLoginRequest: false } };
    case LOGIN_FAILURE:
      const { errorLoginRequest } = payload;
      return { ...state, requestStatuses: {
        ...state.requestStatuses, isActiveLoginRequest: false, errorLoginRequest,
      }};
    default:
      return state;
  }
}

//Actions
export const authUser = (userName) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    const { token, userId, errorMessage, errorCode } = await requestUserAuth(userName);
    if (errorMessage || errorCode) {
      dispatch({ type: LOGIN_FAILURE, payload: { errorLoginRequest: `${errorCode}: ${errorMessage}` } });
    }
    else {
      dispatch({ type: LOGIN_SUCCESS, payload: { userName: userName, userToken: token } });
    }
}

//Selectors
