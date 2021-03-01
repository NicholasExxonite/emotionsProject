// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/database';


let initialized = false;

const firebaseConfig = {
  apiKey: "AIzaSyD3ww9qjogp1cgsuns2wCoNjtKcKV3hC5Y",
  authDomain: "typ-supportingemotions.firebaseapp.com",
  databaseURL: "https://typ-supportingemotions-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "typ-supportingemotions",
  storageBucket: "typ-supportingemotions.appspot.com",
  messagingSenderId: "693078632057",
  appId: "1:693078632057:web:3192415660c408ec45d6a8",
  measurementId: "G-3ZZRWQD3W8"
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
