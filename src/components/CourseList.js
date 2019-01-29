import React from "react";
import { connect } from "react-redux";
import Course from "./Course";

const CourseList = props => (
  <div>
    <h1>Course List</h1>
    <ul>
      {props.courses.map(course => (
        <Course key={course.id} {...course} />
      ))}
    </ul>
  </div>
);

const mapStateToProps = state => ({
  courses: state.courses
});

export default connect(mapStateToProps)(CourseList);
