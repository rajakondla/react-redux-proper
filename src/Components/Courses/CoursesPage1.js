import React from "react";
import { connect } from "react-redux";
import * as courseAction from "../../redux/actions/CourseAction";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

/*
Here component contains its own state course, and from redux store we are getting list of 
courses. Redux maintains its own state in store. Here we are using Redux store as database.
*/
class CoursesPage extends React.Component {
  // this is one way of initializing state
  /*
  constructor(props) {
    super(props);

    this.state = {
      course: {
        title: ""
      }
    };
    // approach 2. better than binding in render function. As this binds only once.
    //this.handleChange = this.handleChange.bind(this);
  }
  */
  // another way also called as class fields. simple to use and do not have to call super method
  state = {
    course: {
      title: ""
    }
  };

  // approach 3 using arrow functions also called as class field
  // arrow functions inherits the binding context of their enclosing scope. so they do not have this bindings. the this referes to class instance.
  handleChange = event => {
    //event.preventDefault();
    // when using regular function this referes to the context of the caller which is change handler not the course class context. But as we are using arrow function, here this referes to class instance
    const course = { ...this.state.course, title: event.target.value };

    //this.setState({course:course});
    // above line can be written with object shorthand syntax. as right side and left
    // side having same variable name.
    this.setState({ course });
  };

  // Note: when you are using arrow function or class fields this.state will be undefined in debugger. This is the drawback of arrow function
  handleSubmit = event => {
    // event.preventDefault() will prevent the default behaviour. In this case the post of the form.
    event.preventDefault();
    // when no mapDispatchToProps
    //this.props.dispatch(courseAction.createCourse(this.state.course));
    // when mapDispatchToProps is used
    //this.props.createCourse(this.state.course);
    // when bindActionCreator is used
    this.props.actions.createCourse(this.state.course);
    //alert(this.state.course.title);
  };

  render() {
    return (
      // handleSubmit can be attached to onclick event of submit button. but for this, user has to explicitly click on submit button. So in order to submit form on click of button and pressing on enter key put function in form tag.
      <form onSubmit={this.handleSubmit}>
        <h2>Course</h2>
        <h3>Add Course</h3>
        {/*   approach 1
              using bind in the render function isn't ideal as it creates a new function on each render. onChange={this.handleChange.bind(this)}
             */}
        <input
          type="text"
          value={this.state.course.title}
          onChange={this.handleChange}
        />
        <input type="submit" value="Save" />
        {// if we are iterating over an array. react expects to provide unique key to keep track of an array. This helps performance.
        this.props.courses.map(course => (
          <div key={course.title}>{course.title}</div>
        ))}
      </form>
    );
  }
}

CoursesPage.propTypes = {
  //  dispatch: PropTypes.func.isRequired,
  //createCourse: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

// function determine what state to pass to component via props
// there can be second parameter ownProps that is component own props
function mapStateToProps(state) {
  return {
    courses: state.courses
  };
}

function mapDispatchToProps(dispatch) {
  return {
    //createCourse: course => dispatch(courseAction.createCourse(course))

    // returns an object. if the course action has multiple actions this is helpful as we do not have to change the code.
    // below line returns courseAction object.
    actions: bindActionCreators(courseAction, dispatch)
  };
}

// when mapDispatchToProps is used as an object. connect function automatically maps each property in mapDispatchToProps to dispatch function. But we still have to modify the mapDispatchToProps when new action added to courseAction.
// const mapDispatchToProps = {
//   createCourse: courseAction.createCourse
// };

// connect returns a function that function then calls our component
// if second argument mapDispatchToProps is not specified, then connect will automatically pass dispath to component
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CoursesPage);
