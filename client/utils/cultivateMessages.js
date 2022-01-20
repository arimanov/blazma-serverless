import _ from 'lodash';
import { MAX_SHOWING_MESSAGES } from './constants';

export default (storedMessages, incomingMessages, userName) => {
    const preparedIncomingMessages = incomingMessages.map((m) => ({...m, self: m.userName === userName}));
    const resultList = _.uniqBy([...storedMessages, ...preparedIncomingMessages], 'id');
    resultList.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    return resultList.splice(resultList.length - MAX_SHOWING_MESSAGES);
}