import { createStore } from "redux";
import rootreducer from "./reducers";
import initialState from "./reducers/InitialState";
import * as courseActions from "./actions/CourseAction";

it("Should handle creating courses", () => {
  // Arrange
  const store = createStore(rootreducer, initialState);
  const course = { title: "Clean code" };

  // act
  const action = courseActions.createCourseSuccess(course);
  store.dispatch(action);

  // Assert
  const createdCourse = store.getState().courses[0];
  expect(createdCourse).toEqual(course);
});
