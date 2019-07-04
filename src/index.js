import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./Components/App";
import "./index.css";
import configureStore from "./redux/configureStore";
import { Provider as ReduxProvider } from "react-redux";

// function Hi() {
//   // debugger;
//   return <p>Hi</p>;
// }

// we can pass our initial state. Passing initial state is usefull for server-side rendering or when you want to load data from localStorage. If we pass initial state here will override the reducer default value of state.
const store = configureStore();
// Provider is a HOC which will pass down the redux store to all child components.
render(
  <ReduxProvider store={store}>
    <Router>
      <App />
    </Router>
  </ReduxProvider>,
  document.getElementById("app")
);
