import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { BeginAPICalls, APIErrorCall } from "../actions/ApiStatusAction";

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthorByIdSuccess() {
  return { type: types.LOAD_AUTHOR_BY_ID_SUCCESS };
}

export function deleteAuthorSuccess(author) {
  return { type: types.DELETE_AUTHOR_SUCCESS, author };
}

export function updateAuthorSuccess(author) {
  return { type: types.UPDATE_AUTHOR_SUCCESS, author };
}

export function createAuthorSuccess(author) {
  return { type: types.CREATE_AUTHOR_SUCCESS, author };
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

export function loadAuthorById(id) {
  return function(dispatch) {
    dispatch(BeginAPICalls());
    return authorApi
      .getAuthors()
      .then(authors => {
        dispatch(loadAuthorByIdSuccess());
        return filterAuthor(authors, parseInt(id));
      })
      .catch(error => {
        dispatch(APIErrorCall());
        throw error;
      });
  };
}

function filterAuthor(authors, id) {
  return authors.find(author => author.id === id) || null;
}

export function deleteAuthor(author) {
  return function(dispatch) {
    dispatch(BeginAPICalls());
    return authorApi
      .deleteAuthor(author.id)
      .then(() => dispatch(deleteAuthorSuccess(author)))
      .catch(error => {
        dispatch(APIErrorCall(error));
        throw error;
      });
  };
}

export function saveAuthor(author) {
  return function(dispatch) {
    dispatch(BeginAPICalls);
    return authorApi
      .saveAuthor(author)
      .then(saveAuthor => {
        author.id
          ? dispatch(updateAuthorSuccess(saveAuthor))
          : dispatch(createAuthorSuccess(saveAuthor));
      })
      .catch(error => {
        dispatch(APIErrorCall());
        throw error;
      });
  };
}
