import { setStartDate, setEndDate } from '../../actions/userInterface';
import moment from 'moment';

test('should setup start date of user interface actions correctly', () => {
  expect(setStartDate('2017-09-01')).toEqual({
    type: 'SET_START_DATE',
    date: moment('2017-09-01')
  });

  expect(setStartDate().date.format('YYYY-MM-DD')).toEqual('2018-09-01');
});

test('should setup End date of user interface actions correctly', () => {
  expect(setEndDate('2017-09-01')).toEqual({
    type: 'SET_END_DATE',
    date: moment('2017-09-01')
  });

  expect(setEndDate().date.format('YYYY-MM-DD')).toEqual('2019-07-01');
});
