import { getAPIStatus, requestUserAuth, requestUserLogout } from '../utils/httpService';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const CLEAR_LOGIN_ERROR = 'login/clear-error';
export const LOGOUT_REQUEST = 'logout/request';
export const LOGOUT_COMPLETE = 'logout/complete';


const initialState = {
  userName: null,
  userToken: null,
  language: 'en',
  messages: [],
  server: {
    status: true,
    currentUserCount: 0,
  },
  requestStatuses: {
    isActiveLoginRequest: false,
    errorLoginRequest: null,
    isActiveLogoutRequest: false,
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
    case LOGOUT_REQUEST:
      return { ...state, requestStatuses: { ...state.requestStatuses, isActiveLogoutRequest: true } };
    case LOGOUT_COMPLETE:
      return { ...state, userName: null, userToken: null, requestStatuses: { ...state.requestStatuses, isActiveLogoutRequest: false } };

    case CLEAR_LOGIN_ERROR:
      return { ...state, requestStatuses: { ...state.requestStatuses, errorLoginRequest: null } };
    default:
      return state;
  }
}

//Actions
export const authUserAction = (userName) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });
  const { token, userId, errorMessage, errorCode } = await requestUserAuth(userName);
  if (errorMessage || errorCode) {
    dispatch({ type: LOGIN_FAILURE, payload: { errorLoginRequest: `${errorCode}: ${errorMessage}` } });
  }
  else {
    dispatch({ type: LOGIN_SUCCESS, payload: { userName: userName, userToken: token } });
  }
}

export const logoutUserAction = () => async (dispatch, getState) => {
  const { userName, userToken } = getState();
  dispatch({ type: LOGOUT_REQUEST });
  await requestUserLogout(userName, userToken);
  dispatch({ type: LOGOUT_COMPLETE });
}

export const clearLoginErrorAction = () => (dispatch) => dispatch({ type: CLEAR_LOGIN_ERROR });


//Selectors
export const loginStatusSelector = (state) => state.requestStatuses.isActiveLoginRequest;
export const logoutStatusSelector = (state) => state.requestStatuses.isActiveLogoutRequest;
export const loginErrorSelector = (state) => state.requestStatuses.errorLoginRequest;
export const connectionStatusSelector = (state) => state.server.status;
export const userDataSelector = ({ userName, userToken }) => ({ userName, userToken });

