import { createStore, combineReducers } from "redux";
const coursesReducerDefaultState = [];
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
const coursesReducer = (state = coursesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return [...state, action.course];
    case "ADD_LESSON":
      return state.map((course, index) => {
        if (index == action.position_in_courses) {
          return {
            ...course,
            lessons: [...course.lessons, action.lesson]
          };
        } else {
          return course;
        }
      });
    case "REMOVE_LESSON":
      return state.map((course, index) => {
        if (index != action.position_in_courses) {
          return course;
        } else {
          return {
            ...course,
            lessons: course.lessons.filter(
              lesson => lesson.lesson_number != action.lesson_number
            )
          };
        }
      });
    case "REMOVE_COURSE":
      return state.filter(({ id }) => id !== action.id);
    case "EDIT_COURSE":
      return state.map(course => {
        if (course.id != action.id) {
          return course;
        } else {
          return { ...course, ...action.modifications };
        }
      });
    // {
    //   type: "EDIT_LESSON",
    //   id,
    //   lesson_number,
    //   modifications
    // }
    case "EDIT_LESSON":
      return state.map(course => {
        if (course.id != action.id) {
          return course;
        } else {
          return {
            ...course,
            lessons: course.lessons.map(lesson => {
              if (lesson.lesson_number != action.lesson_number) {
                return lesson;
              } else {
                return { ...lesson, ...action.modifications };
              }
            })
          };
        }
      });
    default:
      return state;
  }
};

const userInterfaceReducer = (state = userInterfaceDefaultState, action) => {
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

const store = createStore(
  combineReducers({
    courses: coursesReducer,
    userInterface: userInterfaceReducer
  })
);
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
    last_modified: new Date().getTime(),
    lessons: []
  }
});

//ADD_LESSON
const findCoursePositionById = id => {
  let isPresent,
    position_in_courses = (false, -1);
  const courses = store.getState().courses;
  for (let i = 0; i < courses.length; i++) {
    if (courses[i].id === id) {
      isPresent = true;
      position_in_courses = i;
      break;
    }
  }
  return { isPresent, position_in_courses };
};

const addLesson = (
  id,
  {
    location = "",
    hour = "",
    date = "",
    lesson_number = -1,
    description = ""
  } = {}
) => {
  const { isPresent, position_in_courses } = findCoursePositionById(id);
  if (!isPresent) {
    return {
      type: "ADD_ERROR",
      error: {
        description: `Course not found with id: ${id} type : ${typeof id}`
      }
    };
  }
  const course_lessons_number =
    lesson_number <=
    store.getState().courses[position_in_courses].lessons.length
      ? store.getState().courses[position_in_courses].lessons.length + 1
      : lesson_number;
  return {
    type: "ADD_LESSON",
    position_in_courses,
    lesson: {
      location,
      hour,
      date,
      course_id: id,
      lesson_number: course_lessons_number,
      description
    }
  };
};

//REMOVE_COURSE

const removeCourse = ({ id }) => ({ type: "REMOVE_COURSE", id });

//REMOVE_LESSON

const removeLesson = (id, lesson_number) => {
  const { isPresent, position_in_courses } = findCoursePositionById(id);
  if (!isPresent) {
    return {
      type: "ADD_ERROR",
      error: {
        description: `Course not found with id: ${id} type : ${typeof id} for the operation Remove Lesson`
      }
    };
  }
  const course_lessons_number =
    lesson_number <=
    store.getState().courses[position_in_courses].lessons.length
      ? store.getState().courses[position_in_courses].lessons.length + 1
      : lesson_number;
  return {
    type: "REMOVE_LESSON",
    position_in_courses,
    lesson_number
  };
};
//EDIT COURSE

const editCourse = (id, modifications) => ({
  type: "EDIT_COURSE",
  id,
  modifications
});
//EDIT LESSON

const editLesson = (id, lesson_number, modifications) => ({
  type: "EDIT_LESSON",
  id,
  lesson_number,
  modifications
});
// SET_DAY_FILTER
const setStartDate = date => {
  return {
    type: "SET_START_DATE",
    date: date && new Date(date)
  };
};

const setEndDate = date => {
  return {
    type: "SET_END_DATE",
    date: date && new Date(date)
  };
};

//Show visible courses :
const compareBy = field => {
  function compareByDate(a, b) {
    const da = new Date(a.date + " " + a.hour);
    const db = new Date(b.date + " " + b.hour);
    return da > db ? 1 : da < db ? -1 : 0;
  }
  if (field === "date") {
    return compareByDate;
  }
  function compareByMainCourse(a, b) {
    const ca = a.course_id;
    const cb = b.course_id;
    return ca > cb ? 1 : ca < cb ? -1 : 0;
  }
  if (field === "main_course") {
    return compareByMainCourse;
  }

  if (field === "main_course_date") {
    return (a, b) =>
      compareByMainCourse(a, b) != 0
        ? compareByMainCourse(a, b)
        : compareByDate(a, b);
  }
};

const getVisibleLessons = (
  courses,
  { endDate, startDate, courseIdFilters }
) => {
  let filteredLessons = [];
  courses.forEach(course => {
    const isInFilteredCourses =
      courseIdFilters.length == 0 || courseIdFilters.includes(course.id);
    filteredLessons = filteredLessons.concat(
      course.lessons.filter(lesson => {
        const laterThanStartDate =
          !startDate || new Date(lesson.date) >= startDate;
        const earlierThanEndDate = !endDate || new Date(lesson.date) <= endDate;
        console.log(
          isInFilteredCourses,
          laterThanStartDate,
          earlierThanEndDate
        );
        return isInFilteredCourses && laterThanStartDate && earlierThanEndDate;
      })
    );
  });
  return filteredLessons.sort(compareBy("date"));
};

// store creation

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

console.log(
  store.dispatch(
    addLesson("poijadfdf2dzqzd", {
      location: "Agoranov",
      hour: "16:30",
      date: "2019-01-18",
      course_id: "poijadfdf2dzqzd",
      lesson_number: 1,
      description: "JMD will be talking about Agoranov for one long hour"
    })
  )
);

console.log(
  store.dispatch(
    editCourse("poijadfdf2dzqzd", {
      title: "First Course 3"
    })
  )
);

console.log(
  store.dispatch(
    addLesson("poijadfdf2dzqzd", {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-26",
      course_id: "poijadfdf2dzqzd",
      lesson_number: 2,
      description: "JB Bengo will be talking about very interesting things"
    })
  )
);

console.log(
  store.dispatch(
    addLesson("poijadfdf2dzqzd", {
      location: "Telecom",
      hour: "16:30",
      date: "2019-01-31",
      course_id: "poijadfdf2dzqzd",
      lesson_number: -1,
      description: "Un intervenant de qualité"
    })
  )
);

console.log(
  store.dispatch(
    editLesson("poijadfdf2dzqzd", 3, {
      description:
        "Un intervenant de qualité du nom de Piacentino, vous le connaissez"
    })
  )
);

console.log(
  store.dispatch(
    addLesson("poijadfdf2dzqzd", {
      location: "Telecom X",
      hour: "16:31",
      date: "2019-01-31",
      course_id: "poijadfdf2dzqzd",
      lesson_number: -1,
      description: "Un intervenant de qualité"
    })
  )
);

console.log(store.dispatch(setEndDate("2019-02-02")));
console.log(store.dispatch(setStartDate("2019-01-19")));

console.log(
  getVisibleLessons(store.getState().courses, store.getState().userInterface)
);

console.log(store.dispatch(removeLesson("poijadfdf2dzqzd", 4)));

const dispatched_course3 = store.dispatch(
  removeCourse({ id: dispatched_course.course.id })
);
console.log(dispatched_course3);

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
