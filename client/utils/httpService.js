import axios from 'axios';

const API = 'https://chat-api.arimanov.ru';

const STATUS_URL = `${API}/v1/status`;
const SIGN_IN_URL = `${API}/v1/signin`;
const SIGN_OUT_URL = `${API}/v1/signout`;
const MESSAGES_URL = `${API}/v1/messages`;

const prepareErrResult = (err) => ({ errorMessage: err.response.data.message, errorCode: err.response.status });

export const requestUserAuth = async (userName) => {
  try {
    const { data } = await axios.post(SIGN_IN_URL, { name: userName });
    return data;
  } catch (err) {
    return prepareErrResult(err)
  }
}

export const getAPIStatus = async () => {
  try {
    const { data } = await axios.get(STATUS_URL);
    return data;
  } catch (err) {
    return prepareErrResult(err)
  }
}
