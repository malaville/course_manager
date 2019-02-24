import courseReducer from '../../reducers/courses';
import { mock_course_1_info, lesson_1_1, lesson_2_1 } from '../test-data/courses-lessons';

test('DefaultState is well set, one course is added and two lessons one which should not be added because of another course', () => {
  const defaultStateReturned = courseReducer(undefined, { type: '@@INIT' });
  expect(defaultStateReturned).toEqual([]);

  const stateReturnedWithOneCourse = courseReducer(defaultStateReturned, {
    type: 'ADD_COURSE',
    course: { ...mock_course_1_info, last_modified: expect.any(Number) }
  });
  expect(stateReturnedWithOneCourse).toEqual([{ ...mock_course_1_info, lessons: [], last_modified: expect.any(Number) }]);

  // The id of the course is in lessons, therefore, lesson_2_1 which is of the second course, should not be added.
  let oneCourseOneLesson = courseReducer(stateReturnedWithOneCourse, { type: 'ADD_LESSON', lesson: lesson_1_1 });
  oneCourseOneLesson = courseReducer(oneCourseOneLesson, { type: 'ADD_LESSON', lesson: lesson_2_1 });
  expect(oneCourseOneLesson).toEqual([{ ...mock_course_1_info, lessons: [lesson_1_1], last_modified: expect.any(Number) }]);
});
