import * as types from '../actions/actionTypes';
import * as actions from '../actions/userEventActions';


var likeDislikeInitialState = {
	likedEvents: [],
  dislikedEvents: [],
	error: undefined
}
export function likeDislike(state = likeDislikeInitialState, action) {
    switch(action.type){

   	case types.LIKE_EVENT:
			return Object.assign({}, state, {
				likedEvents: [
          ...state.likedEvents,
          {
            eventID: action.eventID,
            viewTime: action.viewTime,
            flipped: action.flipped,
            timestamp: Date.now()
          }
        ]
			});

		case types.DISLIKE_EVENT:
			return Object.assign({}, state, {
        dislikedEvents: [
          ...state.dislikedEvents,
          {
            eventID: action.eventID,
            viewTime: action.viewTime,
            flipped: action.flipped,
            timestamp: Date.now()
          }
        ]
			});

    case types.REMOVE_SEEN_EVENT:
      return Object.assign({}, state, {
        events: state.events,
      })

		default:
			return state
		}
}
