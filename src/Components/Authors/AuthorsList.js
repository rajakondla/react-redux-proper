import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const AuthorsList = ({ authors, onDeleteClick }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Sno</th>
        <th>Name</th>
        <th>No of Courses</th>
        <th colSpan="2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {authors.map(author => {
        return (
          <tr key={author.Sno}>
            <td>{author.Sno}</td>
            <td>{author.name}</td>
            <td>{author.courseCount}</td>
            <td>
              <Link to={"/author/" + author.id}>Edit</Link>
            </td>
            <td>
              <button
                disabled={author.courseCount > 0}
                onClick={() => {
                  onDeleteClick(author);
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

AuthorsList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default AuthorsList;
