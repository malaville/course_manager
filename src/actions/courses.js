import { db } from '../firebase/firebase';

//ADD_COURSE
export const addCourse = ({ id = undefined, title = '', short_name = '', main_teacher = '', description = '' }) => ({
  type: 'ADD_COURSE',
  course: {
    id,
    title,
    short_name,
    main_teacher,
    description
  }
});

export const startAddCourse = (courseData = {}) => dispatch => {
  const { id, title = '', short_name = '', main_teacher = '', description = '' } = courseData;
  const course = { description, title, short_name, main_teacher };
  return db
    .ref('courses')
    .push(course)
    .then(ref => {
      dispatch(addCourse({ id: ref.key, ...course }));
      return ref.key;
    });
};

//ADD_LESSON

export const addLesson = (id, { location = '', hour = '', date = '', lesson_number = -1, description = '' } = {}) => {
  return {
    type: 'ADD_LESSON',
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

export const removeCourse = ({ id }) => ({ type: 'REMOVE_COURSE', id });

//REMOVE_LESSON

export const removeLesson = ({ course_id, lesson_number }) => {
  return {
    type: 'REMOVE_LESSON',
    course_id,
    lesson_number
  };
};
//EDIT COURSE

export const editCourse = ({ course_id, modifications }) => ({
  type: 'EDIT_COURSE',
  course_id,
  modifications
});
//EDIT LESSON

export const editLesson = ({ course_id, lesson_number, modifications }) => ({
  type: 'EDIT_LESSON',
  course_id,
  lesson_number,
  modifications
});
