// Dennis Liang
// Last edited 12/1/20  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyDREc2lp_WyDu7ntQ6M3UnxUzf_27Hf0bI",
  authDomain: "weatherdashboard-3bdc4.firebaseapp.com",
  databaseURL: "https://weatherdashboard-3bdc4-default-rtdb.firebaseio.com",
  projectId: "weatherdashboard-3bdc4",
  storageBucket: "weatherdashboard-3bdc4.appspot.com",
  messagingSenderId: "80992445262",
  appId: "1:80992445262:web:42d193e45d4d8919e6741f",
  measurementId: "G-F9QVEGVE9Z"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

//var database = firebase.database();

//var userId = firebase.auth().currentUser.uid;
 var dbRef =  firebase.database().ref();
 const weatherRef = dbRef.child("table"); 
 weatherRef.on("value", snapshot => {
   snapshot.forEach(rowSnapshot => {
    let key = rowSnapshot.key;
    let value = rowSnapshot.val();

    console.log(value);
    console.log(key);


   });
 });

const output = document.querySelector("#output");
const output2 = document.querySelector("#output2");

