var config = {
  apiKey: "AIzaSyBnXGwqHFj6uYc0s_x27_i9dhq-7bjVx-U",
  authDomain: "plur-chat.firebaseapp.com",
  databaseURL: "https://plur-chat.firebaseio.com",
  projectId: "plur-chat",
  storageBucket: "plur-chat.appspot.com",
  messagingSenderId: "303649986467"
};
firebase.initializeApp(config);


var database = firebase.database();
var connectionsRef = database.ref("/connections");
var connectedRef = database.ref(".info/connected");

connectedRef.on("value", function(snap) {
  if (snap.val()) {

    var con = connectionsRef.push(true);
    con.onDisconnect().remove();
  }
});

connectionsRef.on("value", function(snap) {

  $("#connected-viewers").text(snap.numChildren());
});


var messagesRef = new Firebase('https://plur-chat.firebaseio.com');
  var messageField = $('#messageInput');
  var nameField = $('#nameInput');
  var messageList = $('.messages');

  function addMessage(data) {
    var username = data.name || 'anonymous';
    var message = data.text;
    var nameElement = $('<strong>').text(username);
    var messageElement = $('<li>').text(message).prepend(nameElement);

    messageList.append(messageElement);
    messageList[0].scrollTop = messageList[0].scrollHeight;
  }


  $('.chat').on('submit',function(e) {
    e.preventDefault();


    var message = {
      name : nameField.val(),
      text : messageField.val()
    }

    messagesRef.push(message);
    messageField.val('');

  });


  messagesRef.limitToLast(10).on('child_added', function (snapshot) {
    addMessage(snapshot.val());
  });