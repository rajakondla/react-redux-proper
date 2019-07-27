import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AboutPage from "./About/AboutPage";
import Header from "./Common/Header";
import PageNotFound from "./PageNotFound";
import Courses from "./Courses/CoursesPage";
import ManageAuthor from "./Authors/ManageAuthor";
import AuthorPage from "./Authors/AuthorsPage";
// here we are using exported name which is alreaady there in ManageCoursePage.js. To avoid this error use eslint-disable-line import/no-named-as-default
import ManageCoursePage from "./Courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadCourses } from "../redux/actions/CourseAction";
import PropTypes from "prop-types";
import Callback from "../Callback";
import Profile from "./User/Profile";
import Public from "./Common/Public";
import Private from "./Common/Private";
import APICourse from "./Courses/Courses";
import PrivateRoute from "../Components/Common/PrivateRoute";
import Spinner from "./Common/Spinner";

function App({ loadCourses, ...props }) {
  const [logout, setLogout] = useState(false);

  const [tokenRenewalComplete, setTokenRenewelComplete] = useState(false);

  window.auth.routeHistory = props.history;
  useEffect(() => {
    if (!sessionStorage.getItem("callRenewalToken")) {
      console.log("inside")
      window.auth.renewToken(() => {
        setTokenRenewelComplete(true);
      });
    } else {
      setTokenRenewelComplete(true);
    }

    if (props.courseCount == 0) {
      loadCourses().catch(error => {
        alert("error in loading courses: " + error.message);
        return;
      });
    }
    // else {
    //   setCourseCount(props.courseCount);
    // } // props.courseCount is indirectly watching for redux state. so when redux state change we are modifying the component state.
  }, []);

  const logOut = () => {
    setLogout(true);
  };

  return !tokenRenewalComplete ? (
    <Spinner />
  ) : (
    <div className="container-fluid">
      <Header
        logout={window.auth.logout}
        isAuthenticated={window.auth.isAuthenticated}
        login={window.auth.login}
        hasScope={window.auth.hasScope}
        callLogout={logOut}
      />
      <div>Courses:{props.courseCount}</div>
      <Switch>
        {/* Switch will look for first match and stops there */}
        <Route
          exact
          path="/"
          render={props => (
            <HomePage
              login={window.auth.login}
              isAuthenticated={window.auth.isAuthenticated}
              {...props}
            />
          )}
        />
        <Route
          path="/callback"
          render={props => <Callback auth={window.auth} {...props} />}
        />
        <PrivateRoute
          path="/profile"
          auth={window.auth}
          Component={Profile}
          getProfile={window.auth.getProfile}
          {...props}
          // render={props =>
          //   auth.isAuthenticated ? (
          //     <Profile getProfile={auth.getProfile} {...props} />
          //   ) : (
          //     <Redirect to="/" />
          //   )
          // }
        />
        <Route path="/public" component={Public} />
        <PrivateRoute
          path="/private"
          auth={window.auth}
          Component={Private}
          getAccessToken={window.auth.getAccessToken}
          {...props}
        />
        <PrivateRoute
          path="/apiCourse"
          auth={window.auth}
          authorize={["read:apiCourses"]}
          Component={APICourse}
          {...props}
        />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route path="/author/:id" component={ManageAuthor} />
        <Route path="/author" component={ManageAuthor} />
        <Route path="/authors" component={AuthorPage} />
        <Route path="/authors" component={AuthorPage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

App.propTypes = {
  loadCourses: PropTypes.func.isRequired,
  courseCount: PropTypes.number.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    courseCount: state.courses.length
  };
};

const mapDispatchToProps = {
  loadCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
