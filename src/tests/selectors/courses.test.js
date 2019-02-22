import selectLessons from '../../selectors/courses';

const lesson_1_2 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:15',
  date: undefined,
  course_id: 1,
  lesson_number: 2,
  description: 'JB Bengo will be talking about very interesting things'
};
const lesson_1_3 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:18',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 3,
  description: 'JB Bengo will be talking about very interesting things'
};
const lesson_1_4 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:18',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 4,
  description: 'Version2 : JB Bengo will be talking about very interesting things'
};
const lesson_1_1 = {
  course_short_name: 'SEMI',
  location: 'Agoranov',
  hour: '16:45',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 1,
  description: 'JMD will be talking about Agoranov for one long hour'
};
const lesson_2_1 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '16:30',
  date: '2019-01-18',
  course_id: 2,
  lesson_number: 1,
  description: 'M. Bry will give you very interesting tips to build your first business model !'
};

const lesson_2_2 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '16:30',
  date: '2019-01-27',
  course_id: 2,
  lesson_number: 2,
  description: 'Nicolas Bry will introduce you to the famous post-it technique'
};
const lesson_2_3 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '14:30',
  date: '2019-01-26',
  course_id: 2,
  lesson_number: 3,
  description: 'You will now present your project, even if it is very shitty'
};

const lesson_2_4 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '9:30',
  date: '',
  course_id: 2,
  lesson_number: 10,
  description: "Ce cours n'existe pas"
};
const mock_course_1_info = {
  id: 1,
  title: 'Seminaire Innovation',
  short_name: 'SEMI',
  main_teacher: 'J-M. Dalle',
  description: 'This course is the third of the innovation seminary'
};

const mock_course_2_info = {
  id: 2,
  title: "Management de l'innovation ",
  short_name: 'I4',
  main_teacher: 'J-M. Dalle',
  description: 'This course is the first of the innovation seminary',
  last_modified: 0
};
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
