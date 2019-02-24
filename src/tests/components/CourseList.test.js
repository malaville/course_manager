import { CourseList } from '../../components/CourseList';
import React from 'react';
import { shallow } from 'enzyme';
import { mock_course_list } from '../test-data/courses-lessons';
import Course from '../../components/Course';

test('The course list without focusId should render 2 courses and match snapshot, showLessons should be falsy on each because we do not show lessons in this case, ', () => {
  const shallowCourseList = shallow(<CourseList courses={mock_course_list} />);
  expect(shallowCourseList.find(Course).length).toBe(2);
  expect(
    shallowCourseList
      .find(Course)
      .first()
      .props().showLessons
  ).toBeFalsy();
  expect(shallowCourseList).toMatchSnapshot();
});

test('The course list WITH focusId should render 1 course, and match snapshot', () => {
  const shallowCourseList = shallow(<CourseList courses={mock_course_list} focusId={1} />);
  expect(shallowCourseList.find(Course).length).toBe(1);
  expect(
    shallowCourseList
      .find(Course)
      .first()
      .props().showLessons
  ).toBeTruthy();
  expect(shallowCourseList).toMatchSnapshot();
});
