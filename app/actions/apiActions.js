import apigClient from '../lib/ellieAPI/apigClient'
import * as types from './actionTypes';


export function requestFetchEvents() {
  return {
    type: types.REQUEST_FETCH_EVENTS,
    requestedAt: Date.now()
  }
}

export function receiveEvents(result) {
  return {
    type: types.RECEIVE_EVENTS,
    events: result.data.events,
    receivedAt: Date.now()
  }
}

export function errorFetchEvents(error) {
  return {
    type: types.ERROR_FETCH_EVENTS,
    error: error
  }
}

export function fetchEvents(params, body, additionalParams) {

  return (dispatch, getState) => {

    const { accessKey, secretKey, sessionToken, region } = getState().sessionTokens
    var agc = new apigClient({
       accessKey: accessKey,
       secretKey: secretKey,
       sessionToken: sessionToken,
       region: region
     });

    dispatch(requestFetchEvents())

    return agc.eventsGet(params, body, additionalParams).then((result) => {
      console.log(result)
      dispatch(receiveEvents(result))
    })
    .catch((error) => {
      dispatch(errorFetchEvents(error))
    })
  }
}
