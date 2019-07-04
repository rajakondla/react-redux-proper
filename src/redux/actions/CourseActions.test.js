import * as CourseAction from "./CourseAction";
import * as types from "./actionTypes";
import { courses } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe("Async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  describe("Load Courses Thunk", () => {
    it("should create BEGIN_API_CALL and LOAD_COURSES_SUCCESS when loading courses", () => {
      // create a mock API request and return courses
      fetchMock.mock("*", {
        body: courses,
        headers: { "content-type": "application/json" }
      });

      // when above API request is done we expect below actions
      const expectedActions = [
        { type: types.BEGIN_API_CALL },
        { type: types.LOAD_COURSES_SUCCESS, courses }
      ];

      const store = mockStore({ courses: [] });
      // this is the action API call and comparing this with expected action
      return store.dispatch(CourseAction.loadCourses()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
  });
});

describe("createCourseSuccess", () => {
  it("should create a CREATE_COURSE_SUCCESS", () => {
    // Arrange
    const course = courses[0];
    const expectedAction = { type: types.CREATE_COURSE_SUCCESS, course };

    // Act
    const result = CourseAction.createCourseSuccess(course);

    // Assert
    expect(result).toEqual(expectedAction);
  });
});
