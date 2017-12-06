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

  	var trainName = $('trainNameInput').val().trim();
  	var destination = $('#destinationInput').val().trim();
  	var firsTime = moment ('#timeInput').val().trim();
  	var frequency = $('#frequencyInput').val().trim();

  	database.ref().push ({
  		name:trainName,
  		tdestination: destination,
  		tFirst: firsTime,
  		tfreq: frequency,
  	});

  });
  
trainData.push(newTrains);


$('#trainNameInput').val("");
$('#destinationInput').val("");
$('#timeInput').val("");
$('#frequencyInput').val("");


  

database.ref().on("child_added", function(childSnapshot, prevChildKey) {
	
	console.log(childSnapshot.val());
	var trainName = childSnapshot.val().name;
	var destination = childSnapshot.val().tdestination;
	var firsTime = childSnapshot.val().tFirst;
	var frequency = childSnapshot.val().tfreq;

	console.log(trainName);
	console.log(destination);
	console.log(trainTime);
	console.log(frequency);

	var firstTimeConverted = moment(firsTime, "hh:mm").subtract(1, "years");

	var currentTime = moment();

	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	var tReminder = diffTime % frequency;

	var tMinutesTillTrain = frequency - tReminder;

	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	var nextTrainConverted = moment(nextTrain).format ("hh:mm a");

	$("#trainTable > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + "Every" + frequencyInput + "minutes" + "</td><td>" + nextTrainConverted + "</td><td>" + tMinutesTillTrain + "</td><tr>");

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