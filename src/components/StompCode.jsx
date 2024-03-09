import Stomp from "stompjs";
import SockJS from "sockjs-client";

let stompClient;
let socket;

export function connect(onMessageReceived) {
  console.log("inside connect");
  socket = new SockJS("http://localhost:8081/socket1");
  stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    console.log("Connected: " + frame);
    // Subscribe to a destination (topic or queue)
    stompClient.subscribe("/topic/receive", function (message) {
      console.log("Received message: " + JSON.parse(message.body).content);
      console.log("Received message hr: " + JSON.parse(message.body).hr);
      console.log("Received message min: " + JSON.parse(message.body).min);
      onMessageReceived(JSON.parse(message.body));
      //showGreeting(JSON.parse(message.body).senderName, JSON.parse(message.body).content,JSON.parse(message.body).hr,JSON.parse(message.body).min);
    });
  });
}

export function sendMessage(msg, senderName, receiverName) {
  console.log("inside send msg " + msg);
  console.log("-------- reciever name is : ------------" + receiverName);
  console.log("-------- sender name is : ------------" + senderName);
  var content = msg;
  var currentDate = new Date();
  var hours = currentDate.getHours();
  var minutes = currentDate.getMinutes();
  var seconds = currentDate.getSeconds();
  var data = {
    senderName: senderName,
    recieverName: receiverName,
    content: content,
    hr: hours,
    min: minutes,
  };

  fetch("http://localhost:8081/saveMessage", {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        stompClient.send(
          "/app/sendMessage",
          {},
          JSON.stringify({
            senderName: senderName,
            content: content,
            hr: hours,
            min: minutes,
          })
        );
        return response.json(); // Return the JSON-parsed response
      } else {
        throw new Error("Message not saved");
      }
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Error occurred: " + error.message);
    });
}
