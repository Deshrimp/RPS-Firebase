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

//User will only be able to pick one option
/*function selectOnlyThis(id) {
for (var i = 1; i <= 3; i++) {
    document.getElementById(i).checked = false
  }
  document.getElementById(id).checked = true
}
*/
$(".checkbox").on("click", function() {
  $("#checkboxes").text("")
  var userSelection = this.id
})
