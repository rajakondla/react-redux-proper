import { combineReducers } from "redux";
// as we have used default in courseReducer. we can name what ever we like. this is the advantage of default keyword
import courses from "./CourseReducer";
import authors from "./AuthorReducer";
import apiCallsInProgress from "./APIStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiCallsInProgress
});

export default rootReducer;
