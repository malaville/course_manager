import React from 'react';
import Header from '../../components/Header';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

test('Should header render correctly', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper.find('h1').length).toBe(1);
  expect(wrapper.find('h1').text()).toBe('Course Manager');
  expect(toJson(wrapper)).toMatchSnapshot();
  //   const renderer = new ReactShallowRenderer();
  //   renderer.render(<Header />);
  //   expect(renderer.getRenderOutput()).toMatchSnapshot();
});
