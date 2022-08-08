/* WebSocket API 
  Creates and manages new websocket for the frontend to use
  To work on the local network, the Websocket ned the adress to the backend.
  If you run the front end NPM server and backend on the same machine
  the adress given by npm can be used to replace 'loclahost'.

  Example:
  $npm start
    .....
    You can now view frontend in the browser.
    Local:            http://localhost:3000
    On Your Network:  http://10.10.0.1:3000
  Then in code, use:
  var socket = new WebSocket("ws://10.10.0.1:8080/ws");  

  Websocket_view is the corresponding backend class
*/

//the WebSocket
var socket = new WebSocket("ws://localhost:8080/ws"); // Disble encryption
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