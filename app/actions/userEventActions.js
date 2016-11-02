import * as types from './actionTypes';
import { removeSeenEvent } from './apiActions'


export function likeEvent(event, flipped, showedTime, likedTime) {
  return {
    type: types.LIKE_EVENT,
    event: event,
    flipped: flipped,
    viewTime: likedTime - showedTime
  }
}

export function dislikeEvent(eventID, flipped, showedTime, dislikedTime) {
  return {
    type: types.DISLIKE_EVENT,
    eventID: eventID,
    flipped: flipped,
    viewTime: dislikedTime - showedTime
  }
}

export function handleEventInteraction(event, flipped, showedTime, endTime, didLike) {

  return function(dispatch) {
    if (didLike) {
      dispatch(likeEvent(event, flipped, showedTime, endTime))
    }
    else {
      dispatch(dislikeEvent(event.eventId, flipped, showedTime, endTime))
    }
    dispatch(removeSeenEvent(event.eventId))
  }
}
