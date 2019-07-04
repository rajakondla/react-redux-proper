import React from "react";
import { mount } from "enzyme";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursePage } from "./ManageCoursePage";

function render(args) {
  const defaultProps = {
    course: newCourse,
    loadCourses: jest.fn(),
    loadAuthors: jest.fn(),
    saveCourse: jest.fn(),
    courses,
    authors,
    history: {}
  };

  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
  /*
    to fix the error there are two options
    1) wrap the component in <Provider> and intiatiate the store and pass in.
    return mount(<Provider store={store}><ManageCoursePage /></Provider>);
    2) Export plain unconnected component.
  */
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = render();
  wrapper.find("form").simulate("submit");
  // finding for css class with alert
  const error = wrapper.find(".alert").first();
  expect(error.text()).toBe("Title is required");
});
