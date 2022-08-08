/* WebSocket API 
  Creates and manages new websocket for the frontend to use
  Works on the local network by default, but asumes frontend and backend is running on the same machine.

  Websocket_view is the corresponding backend class
*/

//the WebSocket
//var socket = new WebSocket("ws://localhost:8080/ws"); // Disble encryption
var socket = new WebSocket("ws://" + window.location.hostname + ":8080/ws");// Local network, no encryption
//var socket = new WebSocket("wss://localhost:8080/ws"); // Enable encryption?

// Conect to a WebSocket endpoint
let connect = cb => {  
  console.log("connecting");
  socket.onopen = () => {
    console.log("Successfully Connected");
  };
  socket.onmessage = msg => {
    console.log("New Message:");
    console.log(msg);
    cb(msg);
  };
  socket.onclose = event => {
    console.log("Socket Closed Connection: ", event);
  };
  socket.onerror = error => {
    console.log("Socket Error: ", error);
  };
};

// Send a message to the backend through the websocket endpoint
let sendMsg = (msg) => {
  console.log("sending msg: ", msg);
  socket.send(msg);
};

// Export the WebSocket connection api
export { connect, sendMsg};