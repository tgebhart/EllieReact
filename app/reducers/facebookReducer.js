import * as types from '../actions/actionTypes';
import * as actions from '../actions/apiActions';


var profileInitialState = {
  requestedAt: undefined,
	receivedAt: undefined,
	fetching: false,
	email: undefined,
	name: undefined,
  id: undefined,
  first_name: undefined,
  last_name: undefined,
  email: undefined,
  gender: undefined,
  picture_url: undefined,
	error: undefined
}
export function getUserProfile(state = profileInitialState, action) {

    switch(action.type){

   	case types.REQUEST_USER_PROFILE:
			return Object.assign({}, state, {
				fetching: true,
				requestedAt: action.requestedAt
			});

		case types.RECEIVE_USER_PROFILE:
			return Object.assign({}, state, {
        receivedAt: action.receivedAt,
				fetching: false,
        email: action.email,
        name: action.name,
        id: action.id,
        first_name: action.first_name,
        last_name: action.last_name,
        gender: action.gender,
        picture_url: action.picture_url
			});

		case types.ERROR_REQUEST_USER_PROFILE:
			return Object.assign({}, state, {
				error: action.error,
				fetching: false
			});

		default:
			return state
		}
}
