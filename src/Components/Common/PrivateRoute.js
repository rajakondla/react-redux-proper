import React from "react";
import PropTypes from "prop-types";
import ErrorBoundary from "./ErrorBoundary";
import { Route } from "react-router-dom";

const PrivateRoute = ({ auth, Component, path, ...rest }) => (
  <Route
    path={path}
    render={props => {
      if (!auth.isAuthenticated) return auth.login();

      if (rest.authorize !== undefined && !auth.hasScope(rest.authorize)) {
        return (
          <h1>
            You need following authorization {rest.authorize.join(",")} to view
            this page.
          </h1>
        );
      }
      return (
        <ErrorBoundary>
          <Component {...rest} {...props} />
        </ErrorBoundary>
      );
    }}
  />
);

PrivateRoute.propTypes = {
  Component: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  path: PropTypes.string.isRequired
};

export default PrivateRoute;
