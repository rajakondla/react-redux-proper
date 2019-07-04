import * as types from "../actions/actionTypes";

export function BeginAPICalls() {
  return { type: types.BEGIN_API_CALL };
}

export function APIErrorCall() {
  return { type: types.API_CALL_ERROR };
}
