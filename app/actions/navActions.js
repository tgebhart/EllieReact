mport { POP_ROUTE, PUSH_ROUTE } from './actionTypes'

export function push (route) {
  return {
    type: PUSH_ROUTE,
    route
  }
}

export function pop () {
  return {
    type: POP_ROUTE
  }
}
