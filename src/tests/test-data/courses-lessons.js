export const lesson_1_2 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:15',
  date: undefined,
  course_id: 1,
  lesson_number: 2,
  description: 'JB Bengo will be talking about very interesting things'
};
export const lesson_1_3 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:18',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 3,
  description: 'JB Bengo will be talking about very interesting things'
};
export const lesson_1_4 = {
  course_short_name: 'SEMI',
  location: 'Telecom',
  hour: '15:18',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 4,
  description: 'Version2 : JB Bengo will be talking about very interesting things'
};
export const lesson_1_1 = {
  course_short_name: 'SEMI',
  location: 'Agoranov',
  hour: '16:45',
  date: '2019-01-18',
  course_id: 1,
  lesson_number: 1,
  description: 'JMD will be talking about Agoranov for one long hour'
};
export const lesson_2_1 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '16:30',
  date: '2019-01-18',
  course_id: 2,
  lesson_number: 1,
  description: 'M. Bry will give you very interesting tips to build your first business model !'
};

export const lesson_2_2 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '16:30',
  date: '2019-01-27',
  course_id: 2,
  lesson_number: 2,
  description: 'Nicolas Bry will introduce you to the famous post-it technique'
};
export const lesson_2_3 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '14:30',
  date: '2019-01-26',
  course_id: 2,
  lesson_number: 3,
  description: 'You will now present your project, even if it is very shitty'
};

export const lesson_2_4 = {
  course_short_name: 'I4',
  location: 'Telecom',
  hour: '9:30',
  date: '',
  course_id: 2,
  lesson_number: 10,
  description: "Ce cours n'existe pas"
};
export const mock_course_1_info = {
  id: 1,
  title: 'Seminaire Innovation',
  short_name: 'SEMI',
  main_teacher: 'J-M. Dalle',
  description: 'This course is the third of the innovation seminary'
};

export const mock_course_2_info = {
  id: 2,
  title: "Management de l'innovation ",
  short_name: 'I4',
  main_teacher: 'J-M. Dalle',
  description: 'This course is the first of the innovation seminary',
  last_modified: 0
};
export const mock_course_list = [
  { ...mock_course_1_info, lessons: [lesson_1_1, lesson_1_2, lesson_1_3, lesson_1_4] },
  { ...mock_course_2_info, lessons: [lesson_2_1, lesson_2_2, lesson_2_3, lesson_2_4] }
];
