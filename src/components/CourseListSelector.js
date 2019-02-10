import React from "react";
import { connect } from "react-redux";
import {
  setCourseIdFilters,
  sortLessonsBy,
  setEndDate,
  setStartDate
} from "../actions/userInterface";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";

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

class CourseListSelector extends React.Component {
  state = {
    calendarFocused: null
    // startDate: this.props.startDate,
    // endDate: this.props.endDate
  };

  SelectorParams = {
    filters: [
      { name: "date", id: "date" },
      { name: "course", id: "main_course_date" }
    ],
    selected_id: "main_course_date" //props.lessonFilter
  };

  onDatesChange = ({ startDate, endDate }) => {
    this.props.dispatch(setStartDate(startDate));
    this.props.dispatch(setEndDate(endDate));
  };

  onFocusChange = calendarFocused => {
    this.setState(() => ({ calendarFocused }));
  };
  render() {
    return (
      <form>
        {this.props.courses.map(course => (
          <CourseItemCheckbox
            key={course.id}
            dispatch={this.props.dispatch}
            {...course}
          />
        ))}
        <SortingSelector
          dispatch={this.props.dispatch}
          {...this.SelectorParams}
        />
        <DateRangePicker
          startDate={this.props.startDate}
          endDate={this.props.endDate}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={2}
          isOutsideRange={() => false}
          showClearDates={true}
        />
      </form>
    );
  }
}
const mapStateToProps = state => {
  return {
    courses: state.courses,
    lessonFilter: state.userInterface.sortLessonsBy,
    startDate: state.userInterface.startDate,
    endDate: state.userInterface.endDate
  };
};

export default connect(mapStateToProps)(CourseListSelector);
