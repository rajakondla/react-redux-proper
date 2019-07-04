import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./Home/HomePage";
import AboutPage from "./About/AboutPage";
import Header from "./Common/Header";
import PageNotFound from "./PageNotFound";
import Courses from "./Courses/CoursesPage";
// here we are using exported name which is alreaady there in ManageCoursePage.js. To avoid this error use eslint-disable-line import/no-named-as-default
import ManageCoursePage from "./Courses/ManageCoursePage"; // eslint-disable-line import/no-named-as-default
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        {/* Switch will look for first match and stops there */}
        <Route exact path="/" component={HomePage} />
        <Route path="/courses" component={Courses} />
        <Route path="/about" component={AboutPage} />
        <Route path="/course/:slug" component={ManageCoursePage} />
        <Route path="/course" component={ManageCoursePage} />
        <Route component={PageNotFound} />
      </Switch>
      <ToastContainer autoClose={3000} hideProgressBar />
    </div>
  );
}

export default App;
