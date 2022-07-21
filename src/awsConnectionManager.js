import AWS from 'aws-sdk';
import axios from 'axios';
import moment from 'moment';
import { MOUNTING_PATH } from './globalConfig';

const SESSION_STORAGE_AUTH_KEY = 'auth';

function getTemporaryCredentials() {
  return axios.post(`${MOUNTING_PATH}authenticate`);
}

function storeLatest(result) {
  if (!result) {
    return;
  }

  window.sessionStorage.setItem(
    SESSION_STORAGE_AUTH_KEY,
    JSON.stringify(result.data)
  );

  // eslint-disable-next-line consistent-return
  return result.data;
}

export default {
  AWS,
  getAuthenticationDetails: function getAuthenticationDetails() {
    return new Promise((res) => {
      const sessionAuthEntry = window.sessionStorage.getItem(
        SESSION_STORAGE_AUTH_KEY
      );

      if (sessionAuthEntry) {
        const parsedSessionEntry = JSON.parse(sessionAuthEntry);
        const expiration = moment(parsedSessionEntry.credentials.Expiration);
        const now = moment();

        // check expiry, if it's past, get fresh credentials.
        if (now.isSameOrAfter(expiration)) {
          window.sessionStorage.removeItem(SESSION_STORAGE_AUTH_KEY);
        } else {
          // eslint-disable-next-line no-promise-executor-return
          return res(parsedSessionEntry);
        }
      }

      // eslint-disable-next-line no-promise-executor-return
      return getTemporaryCredentials().then(storeLatest).then(res);
    });
  },
};
