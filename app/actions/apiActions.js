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
    nextPageId: result.data.nextPageId,
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

export function updateHomeQueryParams(params, body, additionalParams) {
  return {
    type: types.UPDATE_HOME_QUERY_PARAMS,
    params: params,
    body: body,
    additionalParams: additionalParams
  }
}

export function fetchEvents() {

  return (dispatch, getState) => {

    const { accessKey, secretKey, sessionToken, region } = getState().sessionTokens
    const { params, body, additionalParams } = getState().eventsGet.homeQueryParams
    const nextPageId = getState().nextPageId
    var agc = new apigClient({
       accessKey: accessKey,
       secretKey: secretKey,
       sessionToken: sessionToken,
       region: region
     });
     if (body['rEngine'] !== undefined) {
       body.nextPageId = nextPageId
     }

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

export function removeSeenEvent(eventID) {
  return {
    type: types.REMOVE_SEEN_EVENT,
    eventID: eventID
  }
}

export function shouldFetchEvents(state) {
  console.log(state.eventsGet.fetching)
  const events = state.eventsGet.events
  if (events.length <= 5) {
    return true
  }
  else if (state.eventsGet.fetching) {
    return false
  }
  return false
}

export function fetchEventsIfNeeded() {

  return (dispatch, getState) => {
    console.log(getState())
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents())
    }
  }
}
