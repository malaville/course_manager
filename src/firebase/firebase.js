import * as firebase from 'firebase';
import { mock_course_1_info, mock_course_2_info, lesson_2_1, lesson_2_2 } from '../tests/test-data/courses-lessons';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
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
