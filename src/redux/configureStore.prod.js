import { createStore, applyMiddleware } from "redux";
// we do not have to call ./reducers/index as we have used index.js. by default webpack will look for index.js
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddleware(thunk));
}
