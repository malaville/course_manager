import * as firebase from 'firebase';
import { mock_course_1_info, mock_course_2_info, lesson_2_1, lesson_2_2 } from '../tests/test-data/courses-lessons';

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

export { firebase, db };

// db.ref().set(null);
// db.ref().push(mock_course_1_info);
// db.ref().push({ ...mock_course_2_info, lessons: [lesson_2_1, lesson_2_2] });

// db.ref()
//   .once('value')
//   .then(snapshot => {
//     const values = [];
//     snapshot.forEach(childSnapshot => {
//       values.push({
//         id: childSnapshot.key,
//         ...childSnapshot.val()
//       });
//     });
//     console.log(values);
//   });

// db.ref().on('child_added', snapshot => {
//   console.log('Added to the DB : ', snapshot.key, snapshot.val());
// });
