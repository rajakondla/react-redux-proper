import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/CourseAction";
import * as authorAction from "../../redux/actions/AuthorsAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router-dom";
import Spinner from "../Common/Spinner";
import { toast } from "react-toastify";
/*
 This component is a container, so all the JSX code should be moved to presentational component
*/

class CoursesPage extends React.Component {
  state = { redirectToAddCoursePage: false };

  // componentDidMount fires once the component mounted. when there is change in redux state mapStateToProps fires by then render method will only be called.
  componentDidMount() {
    const { courseActions, authorActions, courses, authors } = this.props;
    if (courses.length == 0) {
      courseActions.loadCourses().catch(error => {
        alert("error in courses load =>" + error);
      });
    }

    if (authors.length == 0) {
      authorActions.loadAuthors().catch(error => {
        alert("error in authors load =>" + error);
      });
    }
  }

  handleDelete = async course => {
    toast.success("Course deleted");
    try {
      await this.props.courseActions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed = " + error.message, { autoClose: false });
    }
  };

  // <> fragment syntax
  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Redirect to="/course" />}
        <h2>Course</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          /*
             here we need fragment syntax <> as JSX expectes one parent element for each expression.
             Prefer fragment over div if we do not need div, since fragment avoids creating needless elements in DOM.
             */
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => {
                this.setState({ redirectToAddCoursePage: true });
              }}
            >
              Add Course
            </button>
            <CourseList
              onDeleteClick={this.handleDelete}
              courses={this.props.courses}
            />
          </>
        )}
      </>
    );
  }
}

CoursesPage.propTypes = {
  //  dispatch: PropTypes.func.isRequired,
  //createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  courseActions: PropTypes.object.isRequired,
  authorActions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

// function determine what state to pass to component via props
// there can be second parameter ownProps that is component own props
function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses:
      state.authors.length == 0
        ? []
        : state.courses.map(course => {
            return {
              ...course,
              authorName: state.authors.find(cur => cur.id == course.authorId)
                .name
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))

    // returns an object. if the course action has multiple actions this is helpful as we do not have to change the code.
    // below line returns courseAction object.
    courseActions: bindActionCreators(courseAction, dispatch),
    authorActions: bindActionCreators(authorAction, dispatch)
  };
}

// when mapDispatchToProps is used as an object. connect function automatically maps each property in mapDispatchToProps to dispatch function.
// const mapDispatchToProps = {
//   createCourse: courseAction.createCourse
// };

// connect returns a function that function then calls our component
// if second argument mapDispatchToProps is not specified, then connect will automatically pass dispath to component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
