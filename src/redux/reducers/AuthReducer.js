import initialState from "./InitialState";

const auth = { auth: initialState.auth };

export default function authReducer(state = auth) {
  console.log(state.auth);
  return state;
}
