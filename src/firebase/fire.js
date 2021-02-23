import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBsinxC2xXpu5IzEkxX-wNbFB1rH7W-9MQ",
  authDomain: "instagram-clone-51f0b.firebaseapp.com",
  databaseURL: "https://instagram-clone-51f0b-default-rtdb.firebaseio.com",
  projectId: "instagram-clone-51f0b",
  storageBucket: "instagram-clone-51f0b.appspot.com",
  messagingSenderId: "655142300609",
  appId: "1:655142300609:web:ace26a34d16b668130dd40",
};

let fire = firebase.initializeApp(firebaseConfig);
export {firebase}
export default fire;