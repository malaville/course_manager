//ADD_COURSE
export const addCourse = ({
  id = undefined,
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
  return {
    type: "ADD_LESSON",
    lesson: {
      location,
      hour,
      date,
      course_id: id,
      lesson_number,
      description
    }
  };
};

//REMOVE_COURSE

export const removeCourse = ({ id }) => ({ type: "REMOVE_COURSE", id });

//REMOVE_LESSON

export const removeLesson = ({ course_id, lesson_number }) => {
  return {
    type: "REMOVE_LESSON",
    course_id,
    lesson_number
  };
};
//EDIT COURSE

export const editCourse = ({ course_id, modifications }) => ({
  type: "EDIT_COURSE",
  course_id,
  modifications
});
//EDIT LESSON

export const editLesson = ({ course_id, lesson_number, modifications }) => ({
  type: "EDIT_LESSON",
  course_id,
  lesson_number,
  modifications
});
