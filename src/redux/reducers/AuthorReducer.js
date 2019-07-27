import * as types from "../actions/actionTypes";
import initialState from "./InitialState";

export default function authorReducer(state = initialState.authors, action) {
  switch (action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    // case types.LOAD_AUTHOR_BY_ID_SUCCESS:
    //   return action.author;
    case types.DELETE_AUTHOR_SUCCESS: {
      return state.filter(author => author.id != action.author.id);
    }
    case types.UPDATE_AUTHOR_SUCCESS:
      return state.map(author =>
        author.id === action.author.id ? action.author : author
      );
    case types.CREATE_AUTHOR_SUCCESS:
      return [...state, { ...action.author }];
    default:
      return state;
    // if there is a state change all reducers will get fired. So use default to return same state.
  }
}

/*
 To maintain the objects in optimized way follow dictionary way of maintaining the objects. like
 let obj={
     1:{id:1,value:{....}},
     2:{id:1,value:{....}}
 }
 so that we can fetch data by obj[1] or obj[2]
*/
