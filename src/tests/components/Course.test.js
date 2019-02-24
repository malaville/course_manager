import React from 'react';
import { shallow } from 'enzyme';
import { Course } from '../../components/Course';
import Lesson from '../../components/Lesson';
import { mock_course_list } from '../test-data/courses-lessons';

test('The course should render correctly, with 0 lessons when showLessons is falsy', () => {
  const shallowCourse = shallow(<Course {...mock_course_list[0]} />);
  expect(shallowCourse.find(Lesson).length).toBe(0);
  expect(shallowCourse).toMatchSnapshot();
});

const emptyLessonAction = { lesson: { course_id: 1, date: '', description: '', hour: '', lesson_number: -1, location: '' }, type: 'ADD_LESSON' };

test('The course should render correctly, with 4 lessons when showLessons is truthy, moreover, a button should be here and create empty lesson', () => {
  const mockDispatch = jest.fn();
  const shallowCourse = shallow(<Course {...mock_course_list[0]} dispatch={mockDispatch} showLessons={true} />);
  expect(shallowCourse.find(Lesson).length).toBe(4);
  expect(shallowCourse.find('button.btn').length).toBe(1);
  shallowCourse
    .find('button.btn')
    .first()
    .simulate('click');
  expect(mockDispatch).toHaveBeenCalled();
  expect(mockDispatch).toHaveBeenCalledWith(emptyLessonAction);
  expect(shallowCourse).toMatchSnapshot();
});
