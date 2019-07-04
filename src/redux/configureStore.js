import { createStore, applyMiddleware, compose } from "redux";
// we do not have to call ./reducers/index as we have used index.js. by default webpack will look for index.js
import rootReducer from "./reducers";
// framework to check whether we are modifying the state. Make sure for immutability.
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  // apply support for redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  return createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
