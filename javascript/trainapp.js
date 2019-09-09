// * When adding trains, administrators should be able to submit the following:
    
//     * Train Name
    
//     * Destination 
    
//     * First Train Time -- in military time
    
//     * Frequency -- in minutes
  
//   * Code this app to calculate when the next train will arrive; this should be relative to the current time.
  
//   * Users from many different machines must be able to view same train times.
  
//   * Styling and theme are completely up to you. Get Creative!

var firebaseConfig = {
    apiKey: "AIzaSyCmki59iOpuVhydK6X81Zf4ZWybjgHP0_8",
    authDomain: "bootcamp-database.firebaseapp.com",
    databaseURL: "https://bootcamp-database.firebaseio.com",
    projectId: "bootcamp-database",
    storageBucket: "bootcamp-database.appspot.com",
    messagingSenderId: "705706972876",
    appId: "1:705706972876:web:f74c5d21bbb7d43f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

    // Create a variable to reference the database
    var database = firebase.database();

    // Initial Variables (SET the first set IN FIREBASE FIRST)
    // Note remember to create these same variables in Firebase!
    var name = "";
    var role = "";
    var start = "";
    var rate = "";


    // Click Button changes what is stored in firebase
    $("#submit-button").on("click", function(event) {
      // Prevent the page from refreshing
      event.preventDefault();

      // Get inputs
      name = $("#name-input").val().trim();
      role = $("#role-input").val().trim();
      start = $("#start-date").val().trim();
      rate = $("#rate-input").val().trim();


      // Change what is saved in firebase
      database.ref().push({
        name: name,
        role: role,
        start: start,
        rate: rate
      });
    });

    // Firebase is always watching for changes to the data.
    // When changes occurs it will print them to console and html
    database.ref().on("child_added", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().name);
      console.log(snapshot.val().role);
      console.log(snapshot.val().start);
      console.log(snapshot.val().rate);

      // Change the HTML
    //   $("<tbody>").prepend("<tr><th scope='row'>" + snapshot.val().name + " </th><td> " + snapshot.val().role + "</td><td>" + snapshot.val().start + "</td><td>" + snapshot.val().rate + "</td></tr>");
    $("#full-member-list").append("<tr><th scope='row'><span class='employee-name'>" +snapshot.val().name + 
    "</span></th><td><span class='employee-role'>" + snapshot.val().role + 
    "</span></td><td><span class='employee-start'>" + snapshot.val().start + 
    "</span></td><td><span class='time-worked'>Months</span></td><td><span class='employee-rate'>" + snapshot.val().rate + 
    "</span></td><td><span class='total-hours'>Tot</span></td></tr>");
 


      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });