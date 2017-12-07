// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNuDPH1NvrxXWuXY4Bt_W5QUoDRTHjNtU",
    authDomain: "trainschedule-9b1b5.firebaseapp.com",
    databaseURL: "https://trainschedule-9b1b5.firebaseio.com",
    projectId: "trainschedule-9b1b5",
    storageBucket: "trainschedule-9b1b5.appspot.com",
    messagingSenderId: "334342920150"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("trainName-input").val().trim();
  	var destination = $("#destination-input").val().trim();
  	var trainTime = moment ("#time-input").val().trim();
  	var frequency = $("#frequency-input").val().trim();

  	database.ref().push ({
  		name: trainName,
  		destination: destination,
  		time: trainTime,
  		freq: frequency
  	});

//logs everything to console
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);
   
// trainData.push(newTrains);

//empty out form
$('#train-name-input').val("");
$('#destination-input').val("");
$('#time-input').val("");
$('#frequency-input').val("");

});
  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
	console.log(childSnapshot.val());

  //store everything into a variable.
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().destination;
	var trainTime = childSnapshot.val().time;
	var frequency = childSnapshot.val().freq;

  //Train info
  console.log(trainName);
  console.log(destination);
  console.log(trainTime);
  console.log(frequency);

	

	var firstTrainTime = moment(trainTime, "HH:mm").subtract(1, "years");

  var minutesAway = frequency - (moment().diff(moment(firstTrainTime), "minutes") % frequency);


	
	var nextArrival = (moment(moment().add(minutesAway, "minutes")).format("hh:mm"));
	

	$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextArrival + "</td><td>" + minutesAway+ "</td><tr>");

}, function(errorObject) {
	console.log("Errors handled: " + errorObject.code);

});


//   function findNextArrival(firstTime, frequency) {
// 	var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");

// 	var currentTime = moment();
// 	var convertedTime = moment(currentTime).format("hh:mm");

// 	var fiffTime = moment().diff(moment(firstTimeConverted), "minutes");

// 	var reminder = diffTime % frequency;

// 	var minutesAway = frequency - reminder;

// 	var nextTrain = moment().add(minutesAway, "minutes");
// 	var arrivalTime = moment(nextTrain).format("hh:mm");

// 	return(arrivalTime);
//   }
//   function findMinutesAway(firstTime, frequency) {
//   	var firstTimeConverted = moment(firsTime, "hh:mm").subtract(1, "years");

//   	var currentTime = moment();
//   	var convertedTime = moment(currentTime).format("hh:mm");

//   	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  	
//   	var reminder = diffTime % frequency;

//   	var minutesAway = frequency - reminder;

//   	var nextTrain = moment().add(minutesAaway, "minutes");
//   	var arrivalTime = moment(nextTrain).format("hh:mm");

//   	return(minutesAway);
//   }

//   database.ref().on("child-added", function(childSnapshot) {

//   	var name = childSnapshot.val().name;
//   	var destination = childSnapshot.val().destination;
//   	var frequency = childSnapshot.val().frequency;
//   	var firsTime = childSnapshot.val().time;
//   	var nextArrival = findNextArrival(firsTime, frequency);
//   	var minutesAway = findMinutesAway(firstTime, frequency);

//   	$("tbody").append($newRow.append($name).append($destination).append($frequency).append($nextArrival).append($minutesAway));

//     return false;
// });

//   $(document).on("click", "#addTrain", function() {
//   	var $name = $("#trainInput").val();
//   	var $destination = $("#destinationInput").val();
//   	var $firsTime = $("timeInput").val();
//   	var $frequency = $("#frequencyInput").val();

//   	database.ref().push({
//   		name: $name,
//   		destination: $destination,
//   		time: $firstTime,
//   		frequency: $frequency
//   	});
//   });