/*
The view domain holds ellements responsible for viewing the backend content

Websocket managment class.
Setts up the backend and listen for inncoming connection requests.
Orchestrates the websocket process

#### Functionality: ####
Initialize a connection pool,
map inncoming requests to our websocket function


*/

package view

import (
	"log"
	"net/http"

	websocket "go_and_react_todo_application/backend/lib/websocket"
	model "go_and_react_todo_application/backend/model"
)

/* "main" entry function */
func RunWebSocket(input *model.TaskList) {
	handleWebSocketRequests(input)
	// start web service(listenAndServe)
	log.Fatal(http.ListenAndServe(":8080", nil))
}

/* Request routing function */
func handleWebSocketRequests(input *model.TaskList) {
	// Create Web Socket pool in new thread
	pool := websocket.NewPool()
	go pool.Start(input)

	// Map /ws to our websocket function
	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		webSocketServe(pool, w, r)
	})
}

/* WebSocket endpoint */
func webSocketServe(pool *websocket.Pool, respWriter http.ResponseWriter, reqest *http.Request) {
	log.Println("web socket endpoint entered, upgrading connection!")
	// upgrade this connection to a WebSocket
	conn, err := websocket.SocketUpgrade(respWriter, reqest)
	if err != nil {
		log.Println(err)
	}

	/*1. listeners*/
	// listen indefinitely for new messages coming through on our WebSocket connection
	// go websocket.SocketWriter(conn) // SocketWriter is blocking, spawn as a new tread
	// websocket.SocketReader(conn)

	/*2.*/
	// Use a connection pool instead
	client := &websocket.Client{
		Conn: conn,
		Pool: pool,
	}

	pool.Register <- client // Register client
	client.Read()           // listen
}
