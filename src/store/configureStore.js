import { createStore, combineReducers } from "redux";
import coursesReducer from "../reducers/courses";
import userInterfaceReducer from "../reducers/userInterface";

export default () => {
  const store = createStore(
    combineReducers({
      courses: coursesReducer,
      userInterface: userInterfaceReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
