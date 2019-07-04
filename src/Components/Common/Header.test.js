import React from "react";
import Header from "./Header";
import { mount, shallow } from "enzyme";
// header component expects to be run as child of react router and thus receive react router props
import { MemoryRouter } from "react-router-dom";

/*
 Two ways to render a React component for testing with Enzyme
 1) shallow - Renders single component. No DOM created. No child components are rendered.
 2) mount - Renders component with childern. DOM created in memory via JSDOM. 
*/

// Fast, lightweight. Test one component in isolation
it("contains 3 NavLinks via shallow", () => {
  const numLink = shallow(<Header />).find("NavLink").length;
  expect(numLink).toEqual(3);
});

// we also need to pull in React Router's memoryRouter for testing since the Header expects to have React Router's props passed in.
// More realistic. Render component and children.
it("contains 3 anchors via mount", () => {
  const numLinks = mount(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  ).find("a").length;
  expect(numLinks).toEqual(3);
});
