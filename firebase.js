// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyDnHkAcP13Qfavp-dAvqrynaXuxGYScuBE",
    authDomain: "ig-clone-ef7d0.firebaseapp.com",
    projectId: "ig-clone-ef7d0",
    databaseURL:"https://ig-clone-ef7d0.firebaseio.com",
    storageBucket: "ig-clone-ef7d0.appspot.com",
    messagingSenderId: "71627778105",
    appId: "1:71627778105:web:70be20006cfb4e65c3c5e8",
    measurementId: "G-SLJ7G99MT3"  
});
  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage = firebase.storage();
  export{db,auth,storage};