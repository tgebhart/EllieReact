import * as types from './actionTypes';


export function likeEvent(eventID, flipped, showedTime, likedTime) {
  return {
    type: types.LIKE_EVENT,
    eventID: eventID,
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

export function removeSeenEvent(eventID) {
  return {
    type: types.REMOVE_SEEN_EVENT,
    eventID: eventID
  }
}

export function handleEventInteraction(eventID, flipped, showedTime, endTime, didLike) {

  return function(dispatch) {
    if (didLike) {
      dispatch(likeEvent(eventID, flipped, showedTime, endTime))
    }
    else {
      dispatch(dislikeEvent(eventID, flipped, showedTime, endTime))
    }
    dispatch(removeSeenEvent(eventID))
  }
}
