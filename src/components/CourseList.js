import React from "react";
import { connect } from "react-redux";
import Course from "./Course";

const CourseList = props => {
  console.log("props.focusId", props.focusId);
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
          <Course key={course.id} showLessons={false} {...course} />
        ))
      )}
    </ul>
  );
};
const mapStateToProps = state => ({
  courses: state.courses
});

export default connect(mapStateToProps)(CourseList);
