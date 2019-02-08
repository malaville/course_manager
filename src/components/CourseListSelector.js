import React from "react";
import { connect } from "react-redux";
import { setCourseIdFilters, sortLessonsBy } from "../actions/userInterface";

const CourseItemCheckbox = ({ short_name, id, dispatch }) => (
  <label>
    <input
      type="checkbox"
      id={id}
      name={short_name}
      onChange={e => {
        dispatch(setCourseIdFilters(e.target.id, e.target.checked));
        // OODODO
      }}
    />
    {short_name}
  </label>
);

const SortingSelector = ({ filters, dispatch, selected_id }) => (
  <select
    defaultValue={selected_id}
    onChange={e => dispatch(sortLessonsBy(e.target.value))}
  >
    {filters.map(filter => (
      <option key={filter.id} value={filter.id}>
        {filter.name}
      </option>
    ))}
  </select>
);

const CourseListSelector = props => {
  const SelectorParams = {
    filters: [
      { name: "date", id: "date" },
      { name: "course", id: "main_course_date" }
    ],
    selected_id: "main_course_date" //props.lessonFilter
  };
  return (
    <form>
      {props.courses.map(course => (
        <CourseItemCheckbox
          key={course.id}
          dispatch={props.dispatch}
          {...course}
        />
      ))}
      <SortingSelector dispatch={props.dispatch} {...SelectorParams} />
    </form>
  );
};

const mapStateToProps = state => {
  return {
    courses: state.courses,
    lessonFilter: state.userInterface.sortLessonsBy
  };
};

export default connect(mapStateToProps)(CourseListSelector);
