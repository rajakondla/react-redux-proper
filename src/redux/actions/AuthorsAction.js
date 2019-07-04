import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { BeginAPICalls, APIErrorCall } from "../actions/ApiStatusAction";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

// here thunks is used as middleware for making api calls.
// benefit of using it is component can call anync actions as if they are calling sync actions. Component need not have to pass dispatch.
export function loadAuthors() {
  // dispatch is automatically passed by thunk
  return function(dispatch) {
    dispatch(BeginAPICalls());
    return authorApi
      .getAuthors()
      .then(authors => {
        //alert(JSON.stringify(courses));
        dispatch(loadAuthorsSuccess(authors));
      })
      .catch(error => {
        dispatch(APIErrorCall());
        throw error;
      });
  };
}
