import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/authors/";

export function getAuthors() {
  // fetch is built in modern browser for api calls
  return fetch(baseUrl)
    .then(handleResponse)
    .catch(handleError);
}
