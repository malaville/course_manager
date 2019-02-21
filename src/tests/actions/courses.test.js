import {
  addCourse,
  addLesson,
  removeCourse,
  removeLesson,
  editLesson,
  editCourse
} from "../../actions/courses";

const mock_course = {
  id: 1,
  title: "Seminaire Innovation",
  short_name: "SEMI",
  main_teacher: "J-M. Dalle",
  description: "This course is the third of the innovation seminary",
  lessons: [
    {
      location: "Agoranov",
      hour: "16:45",
      date: "2019-01-18",
      course_id: 1,
      lesson_number: 1,
      description: "JMD will be talking about Agoranov for one long hour"
    },
    {
      location: "Telecom",
      hour: "15:15",
      date: "2019-01-24",
      course_id: 1,
      lesson_number: 2,
      description: "JB Bengo will be talking about very interesting things"
    }
  ]
};

const mock_lesson = {
  location: "Agoranov",
  date: "2019-01-19",
  hour: "16:45",
  description: "This course is about agoranov",
  lesson_number: 12
};

test("should setup addCourse action object", () => {
  let action = addCourse(mock_course);
  expect(action).toEqual({
    type: "ADD_COURSE",
    course: {
      ...mock_course,
      lessons: undefined,
      last_modified: expect.any(Number)
    }
  });

  action = addCourse({ ...mock_course, id: undefined });
  expect(action).toEqual({
    type: "ADD_COURSE",
    course: {
      ...mock_course,
      lessons: undefined,
      id: undefined,
      last_modified: expect.any(Number)
    }
  });

  action = addLesson(15, mock_lesson);

  expect(action).toEqual({
    type: "ADD_LESSON",
    lesson: { ...mock_lesson, course_id: 15 }
  });

  expect(removeCourse(mock_course)).toEqual({ type: "REMOVE_COURSE", id: 1 });

  expect(removeLesson(mock_course.lessons[1])).toEqual({
    type: "REMOVE_LESSON",
    course_id: 1,
    lesson_number: 2
  });

  expect(
    editLesson({
      course_id: 1,
      lesson_number: 2,
      modifications: { title: "New Title" }
    })
  ).toEqual({
    type: "EDIT_LESSON",
    course_id: 1,
    lesson_number: 2,
    modifications: { title: "New Title" }
  });

  expect(
    editCourse({
      course_id: 1,
      modifications: { title: "New Title" }
    })
  ).toEqual({
    type: "EDIT_COURSE",
    course_id: 1,
    modifications: { title: "New Title" }
  });
});