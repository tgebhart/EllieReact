import * as types from './actionTypes';
import { removeSeenEvent } from './apiActions'


export function likeEvent(event, flipped, showedTime, likedTime, distance) {
  return {
    type: types.LIKE_EVENT,
    event: event,
    flipped: flipped,
    viewTime: likedTime - showedTime,
    distance: distance
  }
}

export function dislikeEvent(eventID, flipped, showedTime, dislikedTime, distance) {
  return {
    type: types.DISLIKE_EVENT,
    eventID: eventID,
    flipped: flipped,
    viewTime: dislikedTime - showedTime,
    distance: distance
  }
}

export function handleEventInteraction(event, flipped, showedTime, endTime, distance, didLike) {

  return function(dispatch) {
    if (didLike) {
      dispatch(likeEvent(event, flipped, showedTime, endTime, distance))
    }
    else {
      dispatch(dislikeEvent(event.eventId, flipped, showedTime, endTime, distance))
    }
    dispatch(removeSeenEvent(event.eventId))
  }
}
