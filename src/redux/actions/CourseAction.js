import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { BeginAPICalls, APIErrorCall } from "../actions/ApiStatusAction";

// action creator
// export function createCourse(course) {
//   return { type: types.CREATE_COURSE, course };
// }

export function loadCoursesSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export function updateCourseSuccess(course) {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
}

export function createCourseSuccess(course) {
  return { type: types.CREATE_COURSE_SUCCESS, course };
}

export function deleteCourseOptimistic(course) {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
}

// here thunks is used as middleware for making api calls.
// benefit of using it is component can call anync actions as if they are calling sync actions. Component need not have to pass dispatch.
export function loadCourses() {
  // dispatch is automatically passed by thunk
  return function(dispatch) {
    dispatch(BeginAPICalls());
    return courseApi
      .getCourses()
      .then(courses => {
        //alert(JSON.stringify(courses));
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  };
}

/* if we are not using redux thunk
export function loadCourses(dispatch) {

    return courseApi
      .getCourses()
      .then(courses => {
        //alert(JSON.stringify(courses));
        dispatch(loadCoursesSuccess(courses));
      })
      .catch(error => {
        throw error;
      });
  
}

now component has to pass the dispatch and component will know how the action creator is immplmented.

If we use middleware we can switch to different options easily  Redux Promise, Redux Saga
*/

export function saveCourse(course) {
  // here getState is not required but it will have entire redux store state
  return function(dispatch, getState) {
    dispatch(BeginAPICalls());
    return courseApi
      .saveCourse(course)
      .then(savedCourse => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch(error => {
        dispatch(APIErrorCall());
        throw error;
      });
  };
}

export function deleteCourse(course) {
  return function(dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
