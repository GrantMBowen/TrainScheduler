var firebaseConfig = {
    apiKey: "AIzaSyCmki59iOpuVhydK6X81Zf4ZWybjgHP0_8",
    authDomain: "bootcamp-database.firebaseapp.com",
    databaseURL: "https://bootcamp-database.firebaseio.com",
    projectId: "bootcamp-database",
    storageBucket: "bootcamp-database.appspot.com",
    messagingSenderId: "705706972876",
    appId: "1:705706972876:web:f74c5d21bbb7d43f"
  };
  
  firebase.initializeApp(firebaseConfig);

    var database = firebase.database();

    var name = "";
    var destination = "";
    var firsttrain = "";
    var frequency = "";
    var convertedTime = moment(firsttrain, "H/mm")

    $("#submit-button").on("click", function(event) {
      
      event.preventDefault();

      // Get inputs
      name = $("#name-input").val().trim();
      destination = $("#destination-input").val().trim();
      firsttrain = $('#first-train').val().trim();
      frequency = $("#frequency-input").val().trim();


      // Change what is saved in firebase
      database.ref().push({
        name: name,
        destination: destination,
        firsttrain: firsttrain,
        frequency: frequency
      });
    });

    
    database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firsttrain);
      console.log(snapshot.val().frequency);

    
$.when(event).done(function(){
    var frequency = snapshot.val().frequency;
    
    var firsttrain = snapshot.val().firsttrain;
    console.log("This train starts running at: " + firsttrain);

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firsttrain, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    var tFrequency = frequency;
    console.log("Train runs every " + frequency + " minutes");

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minutes Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

   
    $("#full-train-list").append("<tr><th scope='row'><span class='train-name'>" +snapshot.val().name + 
    "</span></th><td><span class='train-dest'>" + snapshot.val().destination + 
    "</span></td><td><span class='first-train'>" + snapshot.val().firsttrain + 
    "</span></td><td><span class='train-frequency'>" + snapshot.val().frequency + 
    " min</span></td><td><span class='until-next'>00 min</span></td></tr>");
 
});

    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });