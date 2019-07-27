import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { loadAuthors, deleteAuthor } from "../../redux/actions/AuthorsAction";
import { loadCourses } from "../../redux/actions/CourseAction";
import PropTypes from "prop-types";
import AuthorsList from "../Authors/AuthorsList";
import Spinner from "../Common/Spinner";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

const AuthorPage = ({
  loadAuthors,
  loadCourses,
  deleteAuthor,
  authors,
  courses,
  loading
}) => {
  const [redirectToAddCoursePage, setRedirectToAddCoursePage] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch(error => {
        alert("error in loading authors => " + error);
        return;
      });
    }
    if (courses.length == 0) {
      loadCourses().catch(error => {
        alert("error in loading courses => " + error);
        return;
      });
    }
  }, [redirectToAddCoursePage]);

  const handleDelete = async course => {
    try {
      await deleteAuthor(course);
      toast.success("Author deleted");
    } catch (error) {
      toast.error("Failure => " + error.message, { autoClose: false });
    }
  };

  return (
    <>
      <h1>Authors</h1>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {redirectToAddCoursePage && <Redirect to="/author" />}
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => {
                setRedirectToAddCoursePage({ redirectToAddCoursePage: true });
                // <Redirect to="/author" />;
              }}
            >
              Add Author
            </button>
            <AuthorsList authors={authors} onDeleteClick={handleDelete} />
          </>
        </>
      )}
    </>
  );
};

AuthorPage.propTypes = {
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  deleteAuthor: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  let sno = 0;
  return {
    courses: state.courses,
    authors: state.authors.map(author => {
      return {
        ...author,
        courseCount: state.courses.filter(
          course => course.authorId === author.id
        ).length,
        Sno: ++sno
      };
    }),
    loading: state.apiCallsInProgress > 0
  };
}

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  deleteAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorPage);
