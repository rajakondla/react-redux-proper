import React, { useEffect, useState } from "react";
import TextInput from "../Common/TextInput";
import PropTypes from "prop-types";
import { loadAuthorById, saveAuthor } from "../../redux/actions/AuthorsAction";
import { connect } from "react-redux";
import { newAuthor } from "../../../tools/mockData";
import { toast } from "react-toastify";
import Spinner from "../Common/Spinner";

const ManageAuthor = ({
  history,
  loadAuthorById,
  saveAuthor,
  loading,
  ...props
}) => {
  const [author, setAuthor] = useState({ ...newAuthor });
  const [error, setError] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (props.match.params.id) {
      loadAuthorById(props.match.params.id)
        .then(author => {
          setAuthor({ ...author });
        })
        .catch(error => {
          alert("error in loading author => " + error);
          return;
        });
    }
  }, []);

  const handleChange = event => {
    const { name, value } = event.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    // await saveAuthor(author)
    //   .then(() => {
    //     toast("Author saved");
    //     history.push("/authors");
    //   })
    //   .catch(error => {
    //     setSaving(false);
    //     setError("Error in saving author => " + error);
    //   });
    if (!formIsValid()) {
      try {
        setSaving(true);
        await saveAuthor(author);
        toast.success("Author saved");
        history.push("/authors");
      } catch (error) {
        setSaving(false);
        toast.error("Error in saving author => " + error);
      }
    }
  };

  const formIsValid = () => {
    const error = {};
    if (author.name === "") error.name = "nam is required";
    setError(error);
    return Object.keys(error).length > 0;
  };

  return (
    <>
      <h1>Manage Author</h1>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextInput
            name="name"
            label="Enter Author"
            onChange={handleChange}
            placeholder="Enter author name"
            value={author ? author.name : ""}
            error={error.name}
          />
          <button type="submit" disabled={saving} className="btn btn-primary">
            {saving ? "Saving..." : "Save"}
          </button>
        </form>
      )}
    </>
  );
};

ManageAuthor.propTypes = {
  history: PropTypes.object.isRequired,
  loadAuthorById: PropTypes.func.isRequired,
  saveAuthor: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  // const id = ownProps.match.params.id;
  // const author = id ? state.author : { ...newAuthor };
  // return { author };
  return {
    loading: state.apiCallsInProgress > 0
  };
};

const mapDispatchToProps = {
  loadAuthorById,
  saveAuthor
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageAuthor);
