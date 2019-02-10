import moment from "moment";
// SET_DAY_FILTER
export const setStartDate = date => {
  return {
    type: "SET_START_DATE",
    date: date && moment(date)
  };
};

export const setEndDate = date => {
  return {
    type: "SET_END_DATE",
    date: date && moment(date)
  };
};

export const setCourseIdFilters = (id, checked) => {
  return {
    type: "SET_COURSE_ID_FILTERS",
    id: parseInt(id),
    checked
  };
};

export const sortLessonsBy = (field, order = 1) => {
  const isValidField =
    ["main_course_date", "date", "main_course"].indexOf(field) != -1;
  if (!isValidField) {
    return {};
  }
  return {
    type: "SORT_LESSONS_BY",
    by: field,
    order
  };
};
