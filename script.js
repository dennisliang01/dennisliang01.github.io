// Dennis Liang
// Last edited 1/9/21

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

setInterval(function(){
  getWeatherData();
}, 5000);

function getWeatherData(){  
  var dbRef =  firebase.database().ref();
  const weatherRef = dbRef.child("table"); 
  let dataLast = " temperature is loading..."; 
  weatherRef.on("value", snapshot => {
    snapshot.forEach(rowSnapshot => {
     let key = rowSnapshot.key;
     let value = rowSnapshot.val();
    dataLast = value.temp; 
     console.log(value);
     console.log(dataLast); 
    });
  });

  document.querySelector("#output").innerHTML = dataLast + `${sensor.unit}`;
  document.querySelector("#time").innerHTML = "This is the tempature at :" + new Date();
}

getWeatherData();
