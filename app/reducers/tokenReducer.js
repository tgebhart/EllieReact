import * as types from '../actions/actionTypes';
import * as actions from '../actions/tokenActions';

export function fbat(state={fbat: undefined, receivedAt: undefined}, action) {
	switch(action.type) {
		case types.RECEIVE_FBAT:
			return Object.assign({}, state, {
				fbat: action.fbat,
				receivedAt: action.receivedAt
			});
		default:
			return state
	}
}

var sessionTokenInitialState = {
	sessionToken: undefined,
	accessKey: undefined,
	secretKey: undefined,
	receivedAt: undefined,
	requestSessionToken: false,
	error: undefined
}
export function sessionTokens(state = sessionTokenInitialState, action) {
    switch(action.type){

   	case types.REQUEST_SESSION_TOKEN:
			return Object.assign({}, state, {
				requestSessionToken: true
			});

		case types.REQUEST_EMAIL_SESSION_TOKEN:
			return Object.assign({}, state, {
				requestSessionToken: true,
				email: action.email,
				password: action.password
		});

		case types.RECEIVE_SESSION_TOKEN:
			return Object.assign({}, state, {
				sessionToken: action.sessionToken,
				accessKey: action.accessKey,
				secretKey: action.secretKey,
				receivedAt: action.receivedAt,
				fbllt: action.fbllt,
				region: action.region
			});

		case types.ERROR_REQUEST_SESSION_TOKEN:
			return Object.assign({}, state, {
				error: action.error
			});

		default:
			return state
		}
}
