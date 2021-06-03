// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';


let initialized = false;

const firebaseConfig = {
//   Add your firebase api config.
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
};

try{
  firebase.initializeApp(firebaseConfig);

}
catch(error)
{
  console.log(error);
}
const database = firebase.database();
require('firebase/database');
// const authenthication = firebase.auth();

export const getDatabase =() =>
{
  return database
  // return firebase.firestore();
}
export default database;

// export const database = firebase.database();
