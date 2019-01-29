// SET_DAY_FILTER
export const setStartDate = date => {
  return {
    type: "SET_START_DATE",
    date: date && new Date(date)
  };
};

export const setEndDate = date => {
  return {
    type: "SET_END_DATE",
    date: date && new Date(date)
  };
};
