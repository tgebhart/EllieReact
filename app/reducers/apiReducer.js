import * as types from '../actions/actionTypes';
import * as actions from '../actions/apiActions';


var eventsGetInitialState = {
	events: [],
  requestedAt: undefined,
	receivedAt: undefined,
	error: undefined
}
export function eventsGet(state = eventsGetInitialState, action) {

    switch(action.type){

   	case types.REQUEST_FETCH_EVENTS:
			return Object.assign({}, state, {
				requestedAt: action.requestedAt
			});

		case types.RECEIVE_EVENTS:
			return Object.assign({}, state, {
        receivedAt: action.receivedAt,
        events: [...state.events, ...action.events]
			});

		case types.ERROR_FETCH_EVENTS:
			return Object.assign({}, state, {
				error: action.error
			});

		default:
			return state
		}
}
