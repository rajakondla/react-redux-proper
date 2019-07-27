import * as actionTypes from "../actions/actionTypes";
import initialState from "./InitialState";

export default function adminReducer(state = initialState.admin, action) {
  switch (action.type) {
    case actionTypes.LOAD_ADMIN_SUCCESS:
      return action.message;
    default:
      return state;
  }
}
