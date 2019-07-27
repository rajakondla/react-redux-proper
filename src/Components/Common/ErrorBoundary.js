import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor() {
    super();
    this.state = { error: null, errorInfo: null };
    // alert("From error boundary");
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
  }

  render() {
    if (this.state.errorInfo != null) {
      return (
        <div>
          <h2>Some thing went wrong</h2>
          {this.state.error && this.state.error.toString()}
          <br />
          {this.state.errorInfo.componentStack}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
