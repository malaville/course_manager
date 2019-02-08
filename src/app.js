import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./store/configureStore";
import {
  addCourse,
  addLesson,
  editCourse,
  editLesson
} from "./actions/courses";
import getVisibleLessons from "./selectors/courses";
import { setEndDate, setStartDate } from "./actions/userInterface";
import "normalize.css/normalize.css";
import "./styles/styles.scss";

const store = configureStore();

// store creation
// store.subscribe(() => {
//   console.log("subscribed : ", store.getState());
// });

const mock_course = {
  id: 1,
  title: "Seminaire Innovation",
  short_name: "SEMI",
  main_teacher: "J-M. Dalle",
  description: "This course is the third of the innovation seminary",
  lessons: [
    {
      location: "Agoranov",
      hour: "16:45",
      date: "2019-01-18",
      course_id: 1,
      lesson_number: 1,
      description: "JMD will be talking about Agoranov for one long hour"
    },
    {
      location: "Telecom",
      hour: "15:15",
      date: "2019-01-24",
      course_id: 1,
      lesson_number: 2,
      description: "JB Bengo will be talking about very interesting things"
    }
  ]
};

const mock_course2 = {
  id: 2,
  title: "Management de l'innovation ",
  short_name: "I4",
  main_teacher: "J-M. Dalle",
  description: "This course is the first of the innovation seminary",
  last_modified: 0,
  lessons: [
    {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-18",
      course_id: 2,
      lesson_number: 1,
      description:
        "M. Bry will give you very interesting tips to build your first business model !"
    },
    {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-27",
      course_id: 2,
      lesson_number: 2,
      description:
        "Nicolas Bry will introduce you to the famous post-it technique"
    },
    {
      location: "Telecom",
      hour: "14:30",
      date: "2019-01-26",
      course_id: 2,
      lesson_number: -1,
      description:
        "You will now present your project, even if it is very shitty"
    },
    {
      location: "Telecom",
      hour: "9:30",
      date: "2019-02-12",
      course_id: 2,
      lesson_number: -1,
      description: "Ce cours n'existe pas"
    }
  ]
};
store.dispatch(addCourse(mock_course));
store.dispatch(addLesson(mock_course.id, mock_course.lessons[0]));
store.dispatch(addLesson(mock_course.id, mock_course.lessons[1]));

store.dispatch(addCourse(mock_course2));

store.dispatch(addLesson(2, mock_course2.lessons[0]));

store.dispatch(
  editCourse(2, {
    title: "First Course"
  })
);

store.dispatch(addLesson(2, mock_course2.lessons[1]));
store.dispatch(addLesson(2, mock_course2.lessons[2]));
store.dispatch(
  editLesson(2, 3, {
    description:
      "Un intervenant de qualité du nom de Piacentino, vous le connaissez"
  })
);
store.dispatch(addLesson(2, mock_course2.lessons[3]));

store.dispatch(setEndDate("2019-02-02"));
store.dispatch(setStartDate("2019-01-17"));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
ReactDOM.render(jsx, document.getElementById("app"));
