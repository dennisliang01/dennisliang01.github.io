// Dennis Liang
// Last edited 1/20/21

console.log("variables");
const selectDeviceBtn = document.querySelector("#select_device");
const output = document.querySelector("#output");
const cutDeviceBtn = document.querySelector("#cut_device");
const output2 = document.querySelector("#output2");
let gdxDevice;

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
var sendData = null; 


const selectDevice = async () => {
  console.log("selectDevice function");
  try {
    gdxDevice = await godirect.selectDevice();
    // print name and serial number
    var stat = `\n Connected to ` + gdxDevice.name;
    output.textContent = stat;

    sendData = setInterval(async function(){
  
      var temp = parseFloat(document.getElementById("data").innerHTML);
      if (isNaN(temp)){
        return; 
      }
      console.log("Data was sent");
      var dbRef =  firebase.database().ref();
      const weatherRef = dbRef.child("table"); 
      weatherRef.remove();
      weatherRef.push({"temp":temp}); 
  }, 500);
  

    //turns on the Default sensor
    gdxDevice.enableDefaultSensors();
    //create a constant enabledSensors that correlates with the enabled sensors of the gdx Device
    const enabledSensors = gdxDevice.sensors.filter(s => s.enabled);

    //create a function that runs for each of the enabled sensor measurements
    enabledSensors.forEach(sensor => {
      //trigger a set of actions to occur whenever the value the sensor detects changes
      sensor.on("value-changed", sensor => {
        document.getElementById("data").innerHTML = `\n ${sensor.value.toFixed(
          2
        )} ${sensor.unit}`;
        console.log(`\n ${sensor.value.toFixed(2)} ${sensor.unit}`);
        sensor.on("value-changed", sensor => {
          console.log("sensor on");
        });
      });
    });
  
  } catch (err) {
    console.error(err);
  }
};

const cutDevice = async () => {
  console.log("cutDevice function");
  try {
    gdxDevice.close();
    document.getElementById("data").innerHTML = "No Data";
    clearInterval(sendData); 
    output.textContent = `\n Disconnected from ` + gdxDevice.name;
  } catch (err) {
    console.error(err);
  }
  
};

selectDeviceBtn.addEventListener("click", selectDevice); //opens selection window displaying available Go Direct sensors
cutDeviceBtn.addEventListener("click", cutDevice); //disconnects sensor device
