import { createStore, combineReducers } from "redux";

//ADD_COURSE
const addCourse = ({
  id = new Date().getTime(),
  title = "",
  short_name = "",
  main_teacher = "",
  description = ""
}) => ({
  type: "ADD_COURSE",
  course: {
    id,
    title,
    short_name,
    main_teacher,
    description,
    last_modified: new Date().getTime()
  }
});

//ADD_LESSON
//REMOVE_COURSE

const removeCourse = ({ id }) => ({ type: "REMOVE_COURSE", id });

//REMOVE_LESSON
//EDIT COURSE
//EDIT LESSON
// SET_DAY_FILTER

// store creation

const coursesReducerDefaultState = [];
const userInterfaceDefaultState = {
  days: [0, 1, 2, 3, 4, 5, 6, 7],
  user: {
    firstName: "NOT LOGGED",
    lastName: "IN"
  },
  courseFilter: [],
  errors: []
};

const coursesReducer = (state = coursesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return [...state, action.course];
    case "REMOVE_COURSE":
      return state.filter(({ id }) => id !== action.id);
    default:
      return state;
  }
};

const userInterfaceReducer = (state = userInterfaceDefaultState, action) => {
  switch (action.type) {
    case "ADD_ERROR":
      let future_state = state;
      future_state.errors = [...future_state.errors, action.error];
      return future_state;
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

store.subscribe(() => {
  console.log("subscribed : ", store.getState());
});
const mock_course = {
  id: "poijadfdf2dzqzd",
  title: "One Course3",
  short_name: "1C3",
  main_teacher: "J-M. Dalle",
  description: "This course is the third of the innovation seminary"
};

console.log(addCourse(mock_course));
const dispatched_course = store.dispatch(addCourse(mock_course));
console.log(dispatched_course);
const dispatched_course2 = store.dispatch(removeCourse({ id: 223 }));
console.log(dispatched_course2);
console.log(dispatched_course.course.id);
const dispatched_course3 = store.dispatch(
  removeCourse({ id: dispatched_course.course.id })
);
console.log(dispatched_course3);

console.log({
  ...user
});

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
