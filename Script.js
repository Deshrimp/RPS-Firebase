// Initialize Firebase
var config = {
  apiKey: "AIzaSyC7HpbDDpzUiX275lzn2Gmpx-4Ofc9LJNw",
  authDomain: "rockpaperscissors-d3d2c.firebaseapp.com",
  databaseURL: "https://rockpaperscissors-d3d2c.firebaseio.com",
  projectId: "rockpaperscissors-d3d2c",
  storageBucket: "rockpaperscissors-d3d2c.appspot.com",
  messagingSenderId: "761687311611"
}
firebase.initializeApp(config)
// Create a variable to reference the database.
var database = firebase.database()
var con
var userName = ""
var userid = ""
var userSelection = ""

// All of our connections will be stored in this directory.
var connectionsRef = database.ref("/connections")

// '.info/connected' is a special location provided by Firebase that is updated every time
// the client's connection state changes.
// '.info/connected' is a boolean value, true if the client is connected and false if they are not.
var connectedRef = database.ref(".info/connected")

// When the client's connection state changes...
connectedRef.on("value", async function (snap) {
  // If they are connected..
  if (snap.val()) {
    // Add user to the connections list.
    con = await connectionsRef.push(true)
    userid = con.key
    // Remove user from tshe connection list when they disconnect.
    con.onDisconnect().remove()
  }
})

// When first loaded or when the connectons list changes...
connectionsRef.on("value", function (snap) {
  if (snap.numChildren() <= 1) {
    userName = "Ragnar"
    $("#userid").text("You are Ragnar")
  }
  else {
    userName = "Rollo"
    $("#userid").text("You are Rollo")
  }
  // Display the viewer count in the html.
  // The number of online users is the number of children in the connections list.
  $("#watchers").text(snap.numChildren())

})

var postsRef = database.ref().child("posts")

//About Once: Listens for exactly one event of the specified event type, and then stops listening.
//This is equivalent to calling on(), and then calling off() inside the callback function.
connectionsRef.once("value", snap => {
  if (snap.numChildren() > 2)
    window.location.replace("./sorry.html")
})
database.ref().on("value", function (snapshot) {
  $(".checkbox").on("click", function () {
    $("#checkboxes").text("")
    userSelection = this.id
    var newPostRef = postsRef.push()
    var postId = newPostRef.key
    newPostRef.set({
      name: userName,
      user: userid,
      selection: userSelection,
      idkey: postId
    })
    var leadsRef = database.ref('posts');
    leadsRef.on('value', function (snapshot) {
      snapshot.forEach(function (childSnapshot) {
        var printname = childSnapshot.val().name;
        var printid = childSnapshot.val().user;
        var printselection = childSnapshot.val().selection;
        console.log(printname)
        console.log(printid)
        console.log(printselection)
      });
    });


    /*if (userName === "Ragnar") {
      var ragnarSelection = userSelection
      console.log("I'm Ragnar")
      console.log(ragnarSelection)
    }
    else {
      var rolloSelection = snapshot.child("Rollo".selection)
      console.log("I'm Rollo")
      console.log(rolloSelection)
    }*/
  })

})
