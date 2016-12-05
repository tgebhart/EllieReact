const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

import * as types from './actionTypes';

export function requestUserProfile() {
  return {
    type: types.REQUEST_USER_PROFILE,
    requestedAt: Date.now()
  }
}

export function receiveUserProfile(result) {
  return {
    type: types.RECEIVE_USER_PROFILE,
    name: result.name,
    first_name: result.first_name,
    last_name: result.last_name,
    id: result.id,
    email: result.email,
    gender: result.gender,
    picture_url: result.picture.data.url,
    receivedAt: Date.now()
  }
}

export function errorRequestUserProfile(error) {
  return {
    type: types.ERROR_REQUEST_USER_PROFILE,
    error: error
  }
}

export function fetchUserProfile() {

  return (dispatch, getState) => {

    const profileRequestParams = {
      fields: {
        string: 'id, name, email, first_name, last_name, gender, picture'
      }
    }
    const profileRequestConfig = {
      httpMethod: 'GET',
      version: 'v2.5',
      parameters: profileRequestParams
      //accessToken: token.toString()
    }
    const responseCallback = ((error, result) => {
        if (error) {
          result.ok = false
          result.error = error
          dispatch(errorRequestUserProfile(error))
        } else {
          result.ok = true
          dispatch(receiveUserProfile(result))
        }
      });

    const profileRequest = new GraphRequest(
      '/me',
      profileRequestConfig,
      responseCallback,
    )

    // Start the graph request.
    dispatch(requestUserProfile())
    return new GraphRequestManager().addRequest(profileRequest).start();

  }

}
