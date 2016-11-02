import * as types from '../actions/actionTypes';
import * as actions from '../actions/apiActions';


var eventsGetInitialState = {
	events: [],
  requestedAt: undefined,
	receivedAt: undefined,
	fetching: false,
	nextPageId: undefined,
	homeQueryParams: {
		params : {},
		body : {},
		additionalParams : {
	  	headers: {},
	  	queryParams: {}
		}
	},
	error: undefined
}
export function eventsGet(state = eventsGetInitialState, action) {

    switch(action.type){

   	case types.REQUEST_FETCH_EVENTS:
			return Object.assign({}, state, {
				fetching: true,
				requestedAt: action.requestedAt
			});

		case types.RECEIVE_EVENTS:
			return Object.assign({}, state, {
        receivedAt: action.receivedAt,
				nextPageId: action.nextPageId,
        events: [...state.events, ...action.events],
				fetching: false
			});

		case types.ERROR_FETCH_EVENTS:
			return Object.assign({}, state, {
				error: action.error,
				fetching: false
			});

		case types.REMOVE_SEEN_EVENT:
			return Object.assign({}, state, {
				events: state.events.slice(1,)
			})

		case types.UPDATE_HOME_QUERY_PARAMS:
			return Object.assign({}, state, {
				homeQueryParams: {
					params: actions.params,
					body: actions.body,
					additionalParams: actions.additionalParams
				}
			})

		default:
			return state
		}
}
