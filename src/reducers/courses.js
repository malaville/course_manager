const coursesReducerDefaultState = [];
export default (state = coursesReducerDefaultState, action) => {
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
