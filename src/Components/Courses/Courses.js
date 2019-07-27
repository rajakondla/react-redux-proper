import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadAPICourses, loadAPIAdmin } from "../../redux/actions/CourseAction";
import Spinner from "../Common/Spinner";
import CourseList from "../Courses/CourseList";

const Courses = ({
  loadAPICourses,
  loadAPIAdmin,
  loading,
  message,
  ...props
}) => {
  useEffect(() => {
    //  if (props.courses.length == 0) {
    loadAPICourses().catch(error => {
      alert("Error in loading the API courses =>" + error.message);
    });
    // loadAPIAdmin().catch(error => {
    //   alert("Error in loading the API courses =>" + error.message);
    // });
    //  }
    loadAdmin();
  }, []);

  const loadAdmin = async () => {
    try {
      await loadAPIAdmin();
    } catch (error) {
      alert("Error in loading the API admin =>" + error.message);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <CourseList courses={props.courses} onDeleteClick={() => {}} />
      )}
      {message}
    </>
  );
};

Courses.propTypes = {
  courses: PropTypes.array.isRequired,
  loadAPICourses: PropTypes.func.isRequired,
  loadAPIAdmin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    message: state.admin,
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadAPICourses,
  loadAPIAdmin
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Courses);
