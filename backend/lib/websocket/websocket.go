/*
Websocket domain holds functionality related to comunication and communication management

Class representing the websocket connection.
Takes an inncoming http request, create and return a websocket connection

#### Functionality: ####
Create a websocket connection
*/
package websocket

import (
	"io"
	"log"
	"net/http"

	websocket "github.com/gorilla/websocket"
)

// A web socket connection variables: https://pkg.go.dev/github.com/gorilla/websocket
var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,

	// Check connection origin, (Acept all)
	CheckOrigin: func(request *http.Request) bool { return true },
}

//"Upgrade" a http connection to a web socket (Create a new web socket)
func SocketUpgrade(respWriter http.ResponseWriter, reqest *http.Request) (*websocket.Conn, error) {
	conn, err := upgrader.Upgrade(respWriter, reqest, nil)
	if err != nil {
		log.Println(err)
		return conn, err
	}
	return conn, nil
}

//************ Deprecated alternative from websocket.go ************//

// Reader to parse conection data
func SocketReader(conn *websocket.Conn) {
	for {
		// getmessage https://github.com/gorilla/websocket/blob/master/conn.go #1068
		messageType, messageBuffer, err := conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		// log
		log.Println(string(messageBuffer))
		// write
		err = conn.WriteMessage(messageType, messageBuffer)
		if err != nil {
			log.Println(err)
			return
		}
	}
}

func SocketWriter(conn *websocket.Conn) {
	for {
		//log.Println("sending")
		messageType, request, err := conn.NextReader()
		if err != nil {
			//log.Prntln(err)
			return
		}
		respWriter, err := conn.NextWriter(messageType)
		if err != nil {
			//log.Prntln(err)
			return
		}
		_, err = io.Copy(respWriter, request)
		if err != nil {
			//log.Prntln(err)
			return
		}
		err = respWriter.Close()
		if err != nil {
			//log.Println(err)
			return
		}
	}
}
