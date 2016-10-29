import AsyncStorage from 'react-native';
import * as types from './actionTypes';


export function login(navProps, res) {
  return {
    type: types.LOGIN,
    nav: navProps,
    data: res
  };
}

export function receiveFbat(fbat) {
  return {
    type: types.RECEIVE_FBAT,
    fbat: fbat.accessToken,
    receivedAt: Date.now(),
    userID: fbat.userID
  }
}

export function requestSessionToken(fbt) {
  return {
    type: types.REQUEST_SESSION_TOKEN,
    fbllt: fbt
  }
}

export function receiveSessionToken(responseJson) {
  return {
    type: types.RECEIVE_SESSION_TOKEN,
    sessionToken : responseJson.Credentials.SessionToken,
    accessKey: responseJson.Credentials.AccessKeyId,
    secretKey: responseJson.Credentials.SecretKey,
    receivedAt: Date.now(),
    fbllt: responseJson.fbllt,
    region: 'us-west-2'
  }
}

export function errorRequestSessionToken(err) {
  return {
    type: types.ERROR_REQUEST_SESSION_TOKEN,
    error: err
  }
}

export function fetchSessionToken(fbllt) {

  return function (dispatch) {

    dispatch(requestSessionToken(fbllt))

    return fetch('https://api.aivibe.com/fb-login/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fbat: fbllt,
        })
      }).then((response) => response.json())
        .then((responseJson) => {
          dispatch(receiveSessionToken(responseJson))
    })
    .catch((error) => {
      console.error(error)
      dispatch(errorRequestSessionToken(error))
    });
  }
}
