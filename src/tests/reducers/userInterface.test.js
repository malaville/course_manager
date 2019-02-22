import userInterfaceReducer from '../../reducers/userInterface';
import moment from 'moment';

const userInterfaceDefaultState = {
  startDate: moment()
    .startOf('year')
    .subtract(4, 'month'),
  endDate: moment()
    .startOf('year')
    .add(6, 'month'),
  user: {
    firstName: 'NOT LOGGED',
    lastName: 'IN'
  },
  sortLessonsBy: 'main_course_date',
  courseIdFilters: [],
  errors: []
};

test('The reducer starts correctly with default state', () => {
  const initialState = userInterfaceReducer(undefined, { type: '@@INIT' });
  expect(initialState).toEqual(userInterfaceDefaultState);

  expect(userInterfaceReducer(userInterfaceDefaultState, { type: 'SET_START_DATE', date: '2011-09-11' })).toEqual({
    ...userInterfaceDefaultState,
    startDate: '2011-09-11'
  });

  expect(userInterfaceReducer(userInterfaceDefaultState, { type: 'SET_END_DATE', date: '2011-09-11' })).toEqual({
    ...userInterfaceDefaultState,
    endDate: '2011-09-11'
  });

  //This sequence simulate selecting 2, then 10 then unselecting 2.
  const first_checking_2 = userInterfaceReducer(userInterfaceDefaultState, { type: 'SET_COURSE_ID_FILTERS', id: 2, checked: true });
  const second_checking_10 = userInterfaceReducer(first_checking_2, { type: 'SET_COURSE_ID_FILTERS', id: 10, checked: true });
  const unchecked_2 = userInterfaceReducer(second_checking_10, { type: 'SET_COURSE_ID_FILTERS', id: 2, checked: false });
  expect(first_checking_2).toEqual({
    ...userInterfaceDefaultState,
    courseIdFilters: [2]
  });
  expect(second_checking_10).toEqual({
    ...userInterfaceDefaultState,
    courseIdFilters: expect.arrayContaining([2, 10])
  });

  expect(unchecked_2).toEqual({
    ...userInterfaceDefaultState,
    courseIdFilters: expect.arrayContaining([10])
  });
});
