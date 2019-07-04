import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/CourseAction";
import { loadAuthors } from "../../redux/actions/AuthorsAction";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../Common/Spinner";
import { toast } from "react-toastify";

/*
 This component is a container so all the JSX code should be moved to presentational component
*/
/* 
 We can use alias as course:initialCourse if we want to destructuring the course. 
 we cannot directly destructure the course as we declared course variable in function.
*/
/*
  Use redux state for global value. Use react state if the state is limited to single or small group of component.
*/

/*
 By putting the export to function we are doing two things.
 1) we are exporting the unconnected component which is useful for testing the component without the redux
 2) exporting the connecting the component with redux connect
*/
export function ManageCoursePage({
  loadCourses,
  loadAuthors,
  saveCourse,
  courses,
  authors,
  history,
  ...props
}) {
  // If second argument is not passed this useEffect fires every time component renders. But we need it to fire only when the component first time mounts. So second argument we pass react will watch for it, if the array changes react will run useEffect. If we pass empty array, there is nothing to change so it will fire only once. componentDidMount will run only once when component mounts first time. React hooks only works with function component.

  /* we are assigning the course to state once on load before the list of courses is available. Our goal is to update the component state when there is change in props. Right now useEffect runs when component did mount. It should run when there is change in props.course
  Another option is to set key in App.js for this component route, so it remounts when key changes.
  */
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (courses.length == 0) {
      loadCourses().catch(error => {
        alert("error in courses load =>" + error);
      });
    } else {
      // updating the state when there is change in props.course
      setCourse({ ...props.course });
    }
    if (authors.length == 0) {
      loadAuthors().catch(error => {
        alert("error in authors load =>" + error);
      });
    }
  }, [props.course]);

  function handleChange(event) {
    /*
      [name]: is a computed property syntax. It allows us to reference a property via a variable. Here name is variable and using it to get the property value.
      const {name,value}=event.target;
      is necessary because to use the event inside setState function. If not destructuring and use event directly in async function we throw the error as (this synthetic event is reused for performance reason because synthetic event will no longer defined in async function). Destructuring avoids this error by retaining the local ref of the event.
    */
    const { name, value } = event.target;
    setCourse(prevCourse => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value
    }));
  }

  // history.push is available as we are using react router redirect to load this component.
  function handleSave(event) {
    event.preventDefault();

    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved.");
        history.push("/courses");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const error = {};
    debugger;
    if (title === "") error.title = "Title is required";
    if (authorId === null) error.author = "Author is required";
    if (category === "") error.category = "Category is required";

    setErrors(error);

    return Object.keys(error).length === 0;
  }

  return courses.length === 0 && authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageCoursePage.propTypes = {
  //  dispatch: PropTypes.func.isRequired,
  //createCourse: PropTypes.func.isRequired,
  course: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  // courseActions: PropTypes.object.isRequired,
  // authorActions: PropTypes.object.isRequired
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
  // any component loaded via React route will get history as props by React router
  history: PropTypes.object.isRequired
};

// here export is used as this will run under redux
export function getCourseBySlug(courses, slug) {
  return courses.find(course => course.slug === slug) || null;
}

// function determine what state to pass to component via props
// there can be second parameter ownProps that is component own props. With own props we can access component props. Eg we can access the URL of component passed by react router.
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  // mapStateToProps runs every time when there is a change in redux store state changes. So when courses are available then getCourseBySlug is called.
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course,
    authors: state.authors,
    courses: state.courses
  };
}

// function mapDispatchToProps(dispatch) {
//   return {
//     //createCourse: course => dispatch(courseAction.createCourse(course))

//     // returns an object. if the course action has multiple actions this is helpful as we do not have to change the code.
//     // below line returns courseAction object.
//     courseActions: bindActionCreators(courseAction, dispatch),
//     authorActions: bindActionCreators(authorAction, dispatch)
//   };
// }

// when mapDispatchToProps is used as an object. connect function automatically maps each property in mapDispatchToProps to dispatch function.
const mapDispatchToProps = {
  // courseActions: courseAction,
  // authorActions: authorAction
  loadCourses,
  loadAuthors,
  saveCourse
};

// connect returns a function that function then calls our component
// if second argument mapDispatchToProps is not specified, then connect will automatically pass dispath to component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageCoursePage);
