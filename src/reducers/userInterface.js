const userInterfaceDefaultState = {
  startDate: undefined,
  endDate: undefined,
  user: {
    firstName: "NOT LOGGED",
    lastName: "IN"
  },
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
    default:
      return state;
  }
};
