import { createStore, combineReducers } from "redux";
import coursesReducer from "../reducers/courses";
import userInterfaceReducer from "../reducers/userInterface";

export default () => {
  const store = createStore(
    combineReducers({
      courses: coursesReducer,
      userInterface: userInterfaceReducer
    })
  );
  return store;
};
