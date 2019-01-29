//ADD_COURSE
export const addCourse = ({
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
export const findCoursePositionById = id => {
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

export const addLesson = (
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

export const removeCourse = ({ id }) => ({ type: "REMOVE_COURSE", id });

//REMOVE_LESSON

export const removeLesson = (id, lesson_number) => {
  const { isPresent, position_in_courses } = findCoursePositionById(id);
  if (!isPresent) {
    return {
      type: "ADD_ERROR",
      error: {
        description: `Course not found with id: ${id} type : ${typeof id} for the operation Remove Lesson`
      }
    };
  }
  return {
    type: "REMOVE_LESSON",
    position_in_courses,
    lesson_number
  };
};
//EDIT COURSE

export const editCourse = (id, modifications) => ({
  type: "EDIT_COURSE",
  id,
  modifications
});
//EDIT LESSON

export const editLesson = (id, lesson_number, modifications) => ({
  type: "EDIT_LESSON",
  id,
  lesson_number,
  modifications
});
