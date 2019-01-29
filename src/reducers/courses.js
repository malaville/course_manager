const coursesReducerDefaultState = [];
export default (state = coursesReducerDefaultState, action) => {
  switch (action.type) {
    case "ADD_COURSE":
      return [...state, action.course];
    case "ADD_LESSON":
      let position_in_courses = -1;
      for (let i = 0; i < state.length; i++) {
        if (state[i].id === action.lesson.course_id) {
          position_in_courses = i;
          break;
        }
      }
      if (position_in_courses == -1) {
        return state;
      }
      const course_lessons_number =
        action.lesson.lesson_number <= state[position_in_courses].lessons.length
          ? state[position_in_courses].lessons.length + 1
          : action.lesson.lesson_number;

      return state.map((course, index) => {
        if (index == position_in_courses) {
          return {
            ...course,
            lessons: [
              ...course.lessons,
              { ...action.lesson, lesson_number: course_lessons_number }
            ]
          };
        } else {
          return course;
        }
      });
    case "REMOVE_LESSON":
      return state.map((course, index) => {
        if (course.id != action.id) {
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
