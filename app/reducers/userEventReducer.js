import * as types from '../actions/actionTypes';
import * as actions from '../actions/userEventActions';


var likeDislikeInitialState = {
	events: [],
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
            event: action.event,
            viewTime: action.viewTime,
            flipped: action.flipped,
						distance: action.distance,
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
						distance: action.distance,
            timestamp: Date.now()
          }
        ]
			});

		default:
			return state
		}
}
