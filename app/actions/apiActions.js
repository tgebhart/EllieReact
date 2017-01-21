import apigClient from '../lib/ellieAPI/apigClient'
import * as types from './actionTypes';


export function requestFetchEvents() {
  return {
    type: types.REQUEST_FETCH_EVENTS,
    requestedAt: Date.now()
  }
}

export function requestFetchLikedEvents() {
  return {
    type: types.REQUEST_FETCH_LIKED_EVENTS,
    requestedAt: Date.now()
  }
}

export function postingLikedEvents() {
  return {
    type: types.POSTING_EVENTS,
    postedAt: Date.now()
  }
}

export function postConfirmation(result) {
  return {
    type: types.POST_EVENT_CONFIRMATION,
    confirmedAt: Date.now()
  }
}

export function errorPost(error) {
  return {
    type: types.ERROR_POST_EVENT,
    error: error
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

export function receiveLikedEvents(result) {
  return {
    type: types.RECEIVE_LIKED_EVENTS,
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

export function errorFetchLikedEvents(error) {
  return {
    type: types.ERROR_FETCH_LIKED_EVENTS,
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
    console.log(getState())
    const nextPageId = getState().eventsGet.nextPageId
    var agc = new apigClient({
       accessKey: accessKey,
       secretKey: secretKey,
       sessionToken: sessionToken,
       region: region
     });
     if (params['rEngine'] === undefined) {
       params.nextPageId = nextPageId
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

export function fetchLikedEvents() {

  return (dispatch, getState) => {
    const { accessKey, secretKey, sessionToken, region } = getState().sessionTokens
    const { params, body, additionalParams } = getState().eventsGet.homeQueryParams
    console.log(getState())
    var agc = new apigClient({
      accessKey: accessKey,
      secretKey: secretKey,
      sessionToken: sessionToken,
      region: region
    });

    dispatch(requestFetchLikedEvents())
    return agc.meLikesGet(params, body, additionalParams).then((result) => {
      console.log('melikesgetresult', result)
      dispatch(receiveLikedEvents(result))
    })
    .catch((error) =>{
      dispatch(errorFetchLikedEvents(error))
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
  const events = state.eventsGet.events
  if (state.eventsGet.fetching) {
    return false
  }
  else if (events.length <= 5) {
    return true
  }
  return false
}

export function fetchEventsIfNeeded() {

  return (dispatch, getState) => {
    if (shouldFetchEvents(getState())) {
      return dispatch(fetchEvents())
    }
  }
}

function buildPostBody(event, liked) {
  console.log(event)
  var flipped = 0
  if (event.event.flipped) {
    flipped = 1
  }
  var like = 0
  if (liked) {
    like = 1
  }
  var distance = event.distance
  if (distance === undefined) {
    distance = -1
  }
  return {
    Data: {
      EventId: event.event.eventId,
      Distance: distance,
      Liked: like,
      Disliked: 1-like,
      Flipped: flipped,
      Timestamp: event.event.showTime,
      Removed: 0,
      ViewTime: event.viewTime
    }
  }
}

export function postLikedEvent() {

  return (dispatch, getState) => {

    const { accessKey, secretKey, sessionToken, region } = getState().sessionTokens
    var events = getState().likeDislike.likedEvents
    var params = {};
		var body = buildPostBody(events[events.length-1], true)
		additionalParams = {
	  	headers: {},
	  	queryParams: {}
		};
    console.log(getState())
    var agc = new apigClient({
       accessKey: accessKey,
       secretKey: secretKey,
       sessionToken: sessionToken,
       region: region
     });

    dispatch(postingLikedEvents())
    return agc.uiRecordPut(params, body, additionalParams).then((result) => {
      console.log(result)
      dispatch(postConfirmation(result))
    })
    .catch((error) => {
      console.log(error)
      dispatch(errorPost(error))
    })
  }

}
