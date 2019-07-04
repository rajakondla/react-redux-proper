import React from "react";
import CourseForm from "./CourseForm";
import { shallow } from "enzyme";

/*
 Two ways to render a React component for testing with Enzyme
 1) shallow - Renders single component. No DOM created. No child components are rendered.
 2) mount - Renders component with childern. DOM created in memory via JSDOM. 
*/

function renderCourseForm(args) {
  const defaultProps = {
    authors: [],
    course: {},
    saving: false,
    errors: {},
    onSave: () => {},
    onChange: () => {}
  };

  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it("renders form and header", () => {
  const wrapper = renderCourseForm();
  // check no of form tags
  expect(wrapper.find("form").length).toBe(1);
  // check text in h2 tag
  expect(wrapper.find("h2").text()).toBe("Add Course");
});

it("labels save buttons as 'Save' when not saving", () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find("button").text()).toBe("Save");
});

it("labels save buttons as 'Saving...' when saving", () => {
  const wrapper = renderCourseForm({ saving: true });
  expect(wrapper.find("button").text()).toBe("Saving...");
});
