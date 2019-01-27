import { createStore } from "redux";

const incrementCount = ({ incrementBy = 1 } = {}) => {
  return {
    type: "INCREMENT",
    incrementBy //equivalent to incrementBy = incrementBy because same name
  };
};

const resetCount = () => ({ type: "RESET_COUNT" });

const setCount = ({ settingValue } = {}) => {
  return {
    type: "SET",
    settingValue
  };
};

const store = createStore((state = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + action.incrementBy };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET_COUNT":
      return { count: 0 };
    case "SET":
      return { count: action.settingValue ? action.settingValue : state.count };
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch({
  type: "INCREMENT",
  incrementBy: 2
});

store.dispatch(incrementCount({ incrementBy: 10 }));
store.dispatch(setCount());
store.dispatch(incrementCount({ incrementBy: -30 }));
store.dispatch(resetCount());
store.dispatch(setCount({ settingValue: 101 }));

unsubscribe();
