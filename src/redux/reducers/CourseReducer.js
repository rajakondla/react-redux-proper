import * as types from "../actions/actionTypes";
import initialState from "./InitialState";

export default function courseReducer(state = initialState.courses, action) {
  switch (action.type) {
    case types.CREATE_COURSE_SUCCESS:
      return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id === action.course.id ? action.course : course
      );
    case types.LOAD_COURSES_SUCCESS:
      return action.courses;
    case types.DELETE_COURSE_OPTIMISTIC:
      return state.filter(course => course.id !== action.course.id);
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
