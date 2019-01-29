import React from "react";
import ReactDOM from "react-dom";
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
console.log(store);
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

const mock_course2 = {
  id: "poijadfdf",
  title: "One Course2",
  short_name: "1C2",
  main_teacher: "J-M. Dalle",
  description: "This course is the first of the innovation seminary",
  last_modified: 0,
  lessons: [
    {
      location: "Agoranov",
      hour: "16:30",
      date: "2019-01-18",
      course_id: "poijadfdf",
      lesson_number: 1,
      description: "JMD will be talking about Agoranov for one long hour"
    },
    {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-26",
      course_id: "poijadfdf",
      lesson_number: 2,
      description: "JB Bengo will be talking about very interesting things"
    }
  ]
};
store.dispatch(addCourse(mock_course2));
store.dispatch(addLesson(mock_course2.id, mock_course2.lessons[0]));
store.dispatch(addLesson(mock_course2.id, mock_course2.lessons[1]));

store.dispatch(addCourse(mock_course));

store.dispatch(
  addLesson(
    "poijadfdf2dzqzd",
    {
      location: "Agoranov",
      hour: "16:30",
      date: "2019-01-18",
      course_id: "poijadfdf2dzqzd",
      lesson_number: 1,
      description: "JMD will be talking about Agoranov for one long hour"
    },
    store
  )
);

store.dispatch(
  editCourse("poijadfdf2dzqzd", {
    title: "First Course 3"
  })
);

store.dispatch(
  addLesson(
    "poijadfdf2dzqzd",
    {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-26",
      course_id: "poijadfdf2dzqzd",
      lesson_number: 2,
      description: "JB Bengo will be talking about very interesting things"
    },
    store
  )
);

store.dispatch(
  addLesson(
    "poijadfdf2dzqzd",
    {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-31",
      course_id: "poijadfdf2dzqzd",
      lesson_number: -1,
      description: "Un intervenant de qualité"
    },
    store
  )
);

store.dispatch(
  editLesson("poijadfdf2dzqzd", 3, {
    description:
      "Un intervenant de qualité du nom de Piacentino, vous le connaissez"
  })
);

store.dispatch(
  addLesson("poijadfdf2dzqzd", {
    location: "Telecom",
    hour: "16:30",
    date: "2019-02-12",
    course_id: "poijadfdf2dzqzd",
    lesson_number: -1,
    description: "Un intervenant de qualité"
  })
);
store.dispatch(setEndDate("2019-02-02"));
store.dispatch(setStartDate("2019-01-19"));
const lessons = getVisibleLessons(
  store.getState().courses,
  store.getState().userInterface
);
ReactDOM.render(
  <div>
    <AppRouter />
    {lessons.map(lesson => (
      <p key={lesson.course_short_name + "_" + lesson.lesson_number}>
        {JSON.stringify(lesson)}
      </p>
    ))}
  </div>,
  document.getElementById("app")
);
