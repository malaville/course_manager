import selectLessons from '../../selectors/courses';
import {
  mock_course_1_info,
  mock_course_2_info,
  lesson_1_1,
  lesson_1_2,
  lesson_1_3,
  lesson_1_4,
  lesson_2_1,
  lesson_2_2,
  lesson_2_3,
  lesson_2_4
} from '../test-data/courses-lessons';

const mock_course_list = [
  { ...mock_course_1_info, lessons: [lesson_1_1, lesson_1_2, lesson_1_3, lesson_1_4] },
  { ...mock_course_2_info, lessons: [lesson_2_1, lesson_2_2, lesson_2_3, lesson_2_4] }
];

const parameters_1 = { endDate: undefined, startDate: undefined, courseIdFilters: [], sortLessonsBy: 'date' };
const parameters_2 = { endDate: '2019-01-26', startDate: undefined, courseIdFilters: [2], sortLessonsBy: 'date' };
const parameters_3 = { endDate: '2019-01-26', startDate: '2019-01-19', courseIdFilters: [], sortLessonsBy: 'main_course_date' };
const parameters_4 = { ...parameters_3, showWithNoDate: true };

test('Should sort lessons correctly with no dates', () => {
  expect(selectLessons(mock_course_list, parameters_1)).toEqual([lesson_1_3, lesson_1_4, lesson_2_1, lesson_1_1, lesson_2_3, lesson_2_2]);
});
test('Should sort lessons correctly with endDate', () => {
  expect(selectLessons(mock_course_list, parameters_2)).toEqual([lesson_2_1, lesson_2_3]);
});
test('Should sort lessons correctly with startDate and endDate', () => {
  expect(selectLessons(mock_course_list, parameters_3)).toEqual([lesson_2_3]);
});

test('Should sort lessons correctly with startDate and endDate with showing no dates', () => {
  expect(selectLessons(mock_course_list, parameters_4)).toEqual([lesson_2_4, lesson_1_2, lesson_2_3]);
});
