import { format } from 'date-fns'
import cultivateMessages from "../utils/cultivateMessages";

import {
    getAPIStatus,
    requestUserAuth,
    requestUserLogout,
    requestGetMessages,
    requestSendMessage
} from '../utils/httpService';

export const LOGIN_REQUEST = 'login/request';
export const LOGIN_SUCCESS = 'login/success';
export const LOGIN_FAILURE = 'login/failure';
export const CLEAR_LOGIN_ERROR = 'login/clear-error';
export const LOGOUT_REQUEST = 'logout/request';
export const LOGOUT_COMPLETE = 'logout/complete';
export const MESSAGES_GET_REQUEST = 'messages/get/request';
export const MESSAGES_GET_SUCCESS = 'messages/get/success'
export const MESSAGES_GET_FAILURE = 'messages/get/failure'
export const MESSAGE_SEND_REQUEST = 'messages/post/request';
export const MESSAGE_SEND_SUCCESS = 'messages/post/success';
export const MESSAGE_SEND_FAILURE = 'messages/post/failure';
export const FETCHING_TOGGLE = 'messages/fetching-toggle'

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
        isActiveGetMessageRequest: false,
        isActiveSendMessageRequest: false,
    },
    messageFetchingEnabled: true,
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

        case MESSAGES_GET_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: true } };
        case MESSAGES_GET_SUCCESS:
            const { messages } = payload;
            return { ...state, messages: cultivateMessages(state.messages, messages, state.userName), requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: false } };
        case MESSAGES_GET_FAILURE:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveGetMessageRequest: false } };

        case MESSAGE_SEND_REQUEST:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: true } };
        case MESSAGE_SEND_SUCCESS:
            const { message } = payload;
            return { ...state, messages: cultivateMessages(state.messages, [message], state.userName), requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: false } };
        case MESSAGE_SEND_FAILURE:
            return { ...state, requestStatuses: { ...state.requestStatuses, isActiveSendMessageRequest: false } };

        case FETCHING_TOGGLE:
            return { ...state, messageFetchingEnabled: !state.messageFetchingEnabled };


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

export const fetchMessagesAction = () => async (dispatch, getState) => {

        const ts = format(new Date(), 'mm:ss');

        if (getState().userToken && !getState().requestStatuses.isActiveGetMessageRequest && getState().messageFetchingEnabled) {

            console.log(ts, ': 🤎 Reducer run fetch');

            dispatch({ type: MESSAGES_GET_REQUEST });

            const { messages, errorMessage, errorCode  } = await requestGetMessages(getState().userToken, "");

            if (errorMessage || errorCode) {
                dispatch({ type: MESSAGES_GET_FAILURE, payload: { } });
            }
            else {
                dispatch({ type: MESSAGES_GET_SUCCESS, payload: { messages } });
            }
        }
        else {
            console.log(ts, ': 💔 Reducer skip fetch');
        }
}

export const sendMessageAction = (message) => async (dispatch, getState) => {
    dispatch({ type: MESSAGE_SEND_REQUEST });
    const { messageInfo, errorMessage, errorCode  } = await requestSendMessage(getState().userToken, message);
    if (errorMessage || errorCode) {
        dispatch({ type: MESSAGE_SEND_FAILURE });
        return false;
    }
    else {
        dispatch({ type: MESSAGE_SEND_SUCCESS, payload: { message: { ...messageInfo, message, userName: getState().userName } } });
        return true;
    }
}

export const clearLoginErrorAction = () => (dispatch) => dispatch({ type: CLEAR_LOGIN_ERROR });
export const toggleMessageFetching = () => (dispatch) => dispatch({ type: FETCHING_TOGGLE });

//Selectors
export const loginStatusSelector = (state) => state.requestStatuses.isActiveLoginRequest;
export const logoutStatusSelector = (state) => state.requestStatuses.isActiveLogoutRequest;
export const fetchMessageActiveSelector = (state) => state.requestStatuses.isActiveGetMessageRequest;
export const loginErrorSelector = (state) => state.requestStatuses.errorLoginRequest;
export const connectionStatusSelector = (state) => state.server.status;
export const userDataSelector = ({ userName, userToken }) => ({ userName, userToken });
export const messagesSelector = (state) => state.messages;
export const messageFetchingEnabledStatus = (state) => state.messageFetchingEnabled;


