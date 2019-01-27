import { createStore, combineReducers } from "redux";

//ADD_COURSE
//ADD_LESSON
//REMOVE_COURSE
//REMOVE_LESSON
//EDIT COURSE
//EDIT LESSON
// SET_DAY_FILTER

const coursesReducerDefaultState = [];
const userInterfaceDefaultState = {
  days: [0, 1, 2, 3, 4, 5, 6, 7],
  user: {
    firstName: "NOT LOGGED",
    lastName: "IN"
  },
  courseFilter: []
};

const coursesReducer = (state = coursesReducerDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const userInterfaceReducer = (state = userInterfaceDefaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({
    courses: coursesReducer,
    userInterface: userInterfaceReducer
  })
);

console.log(store.getState());

const demoState = {
  courses: [
    {
      id: "poijadkjf",
      title: "One Course",
      short_name: "1C1",
      main_teacher: "J-M. Dalle",
      description: "This course is the first of the innovation seminary",
      last_modified: 0,
      lessons: [
        {
          location: "Agoranov",
          hour: "16:30",
          date: "2019-01-18",
          course_id: "poijadkjf",
          lesson_number: 1,
          description: "JMD will be talking about Agoranov for one long hour"
        },
        {
          location: "Telecom",
          hour: "16:30",
          date: "2019-01-26",
          course_id: "poijadkjf",
          lesson_number: 2,
          description: "JB Bengo will be talking about very interesting things"
        }
      ]
    },
    {
      id: "poijadfdf",
      title: "One Course2",
      short_name: "1C2",
      main_teacher: "J-M. Dalle",
      description: "This course is the first of the innovation seminary",
      last_modified: 0,
      lessons: [
        {
          location: "Agoranov2",
          hour: "16:30",
          date: "2019-01-18",
          course_id: "poijadfdf",
          lesson_number: 1,
          description: "JMD will be talking about Agoranov for one long hour"
        },
        {
          location: "Telecom2",
          hour: "16:30",
          date: "2019-01-26",
          course_id: "poijadfdf",
          lesson_number: 2,
          description: "JB Bengo will be talking about very interesting things"
        }
      ]
    }
  ],
  userInterface: {
    days: [0, 1, 2, 3, 4, 5, 6, 7],
    user: {
      firstName: "Marc-Antoine",
      lastName: "Laville"
    },
    courseFilter: ["1C2"]
  }
};
