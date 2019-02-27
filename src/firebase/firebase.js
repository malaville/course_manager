import * as firebase from 'firebase';
import { mock_course_1_info, mock_course_list } from '../tests/test-data/courses-lessons';

const config = {
  apiKey: 'AIzaSyD5y1wbo3Zyv7Ggg5MVDg7x5vfFAgrK-ik',
  authDomain: 'coursemanager-47a2a.firebaseapp.com',
  databaseURL: 'https://coursemanager-47a2a.firebaseio.com',
  projectId: 'coursemanager-47a2a',
  storageBucket: 'coursemanager-47a2a.appspot.com',
  messagingSenderId: '85394690370'
};
firebase.initializeApp(config);
const db = firebase.database();
db.ref().set({ name: 'Hello', age: 27 });
db.ref('age').set(29);
