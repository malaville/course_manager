import moment from "moment";

const userInterfaceDefaultState = {
  startDate: moment().startOf("year"),
  endDate: moment().endOf("month"),
  user: {
    firstName: "NOT LOGGED",
    lastName: "IN"
  },
  sortLessonsBy: "main_course_date",
  courseIdFilters: [],
  errors: []
};
export default (state = userInterfaceDefaultState, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      return { ...state, errors: [...state.errors, action.error] };
    case "SET_START_DATE":
      return { ...state, startDate: action.date };
    case "SET_END_DATE":
      return { ...state, endDate: action.date };
    case "SET_COURSE_ID_FILTERS":
      let newCourseIdFilters;
      if (action.checked) {
        newCourseIdFilters = [...state.courseIdFilters, action.id];
      } else {
        newCourseIdFilters = state.courseIdFilters.filter(
          id => id != action.id
        );
      }
      return { ...state, courseIdFilters: newCourseIdFilters.sort() };
    case "SORT_LESSONS_BY":
      return { ...state, sortLessonsBy: action.by };
    default:
      return state;
  }
};
