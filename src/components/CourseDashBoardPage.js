import React from "react";
import CourseListSelector from "./CourseListSelector";
import { connect } from "react-redux";
import coursesExtractor from "../selectors/courses";
import Lesson from "../components/Lesson";

const CourseDashBoardPage = props => (
  <div>
    This Page shows your courses
    <br />
    <CourseListSelector />
    <ul>
      {props.lessons_to_display.map(lesson => (
        <Lesson
          key={lesson.course_id + "_" + lesson.lesson_number}
          {...lesson}
        />
      ))}
    </ul>
  </div>
);
const mapStateToProps = state => {
  return {
    lessons_to_display: coursesExtractor(state.courses, state.userInterface)
  };
};

export default connect(mapStateToProps)(CourseDashBoardPage);
