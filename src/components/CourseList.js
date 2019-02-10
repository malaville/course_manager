import React from "react";
import { connect } from "react-redux";
import Course from "./Course";

const CourseList = props => {
  return (
    <ul>
      {props.focusId ? (
        <Course
          showLessons={true}
          {...props.courses.filter(course => {
            return course.id == props.focusId;
          })[0]}
        />
      ) : (
        props.courses.map(course => (
          <Course
            key={course.id}
            showLessons={false}
            {...course}
            showLessons={course.id == props.focusId}
          />
        ))
      )}
    </ul>
  );
};
const mapStateToProps = state => ({
  courses: state.courses
});

export default connect(mapStateToProps)(CourseList);
