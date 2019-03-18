import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import coursesReducer from '../reducers/courses';
import userInterfaceReducer from '../reducers/userInterface';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      courses: coursesReducer,
      userInterface: userInterfaceReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};
