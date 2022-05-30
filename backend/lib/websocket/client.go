/*
Websocket domain holds functionality related to comunication and communication management

This class represent a connected websocket and client
This class represents and handles communication bewteen a
client and the of the backend through a websocket connection

#### Functionality ####
Represent a conected client and keep the websocket connection
Manage end of lifsycle when connection closes
Listen and process anny messages recived through the connection
Prosess anny messages recived

*/
package websocket

import (
	"encoding/json"
	"fmt"
	"log"

	database "go_and_react_todo_application/backend/lib/database"
	model "go_and_react_todo_application/backend/model"

	"github.com/gorilla/websocket"
)

// A speciffic connection in a pool of connections
type Client struct {
	ID   string
	Conn *websocket.Conn
	Pool *Pool // Parrent ellement
}

// A message recived from the frontend
type WsMessage struct {
	Type int    // Text or Binary
	Body string // Content
}

// Check for messages continusly and broadcast that to the entire pool
func (client *Client) Read() {
	defer func() { // When Read() return
		// Close the connection
		client.Pool.Unregister <- client
		client.Conn.Close()
	}()

	// Check for messages and pass to broadcast
	for {
		wsMessageType, wsMessageBuffer, err := client.Conn.ReadMessage()
		if err != nil {
			log.Println(err)
			return
		}
		wsMessage := WsMessage{Type: wsMessageType, Body: string(wsMessageBuffer)}
		fmt.Printf("Message Received: %+v\n", wsMessage)
		// Extract message data:
		convinp := []byte(wsMessage.Body) // explisit typecast
		var message model.Message
		err = json.Unmarshal(convinp, &message) // Extract message data
		if err != nil {                         // opperation failed, logg
			fmt.Printf("Error, Message not proccesed: %+v\n", err)
			log.Println(err)
		} else { // OK Continue
			// Check if empty, TODO: Or has other ilegal name
			if message.Name == "" {
				log.Println("Error: Recived empty name:", message)
			} else { // OK Continue
				if message.M_Type == model.New_Task { // Message_Type.New_Task
					newTaskPath(message, client)
				} else if message.M_Type == model.Update_Task {
					updateTaskPath(message, client)
					//deleteTaskPath(message, client)
				} else if message.M_Type == model.Delete_Task {
					deleteTaskPath(message, client)
				} else { // No acepted message type recived
					fmt.Printf("Message not proccesed, Undefined Type: %+v\n", message.M_Type)
				}
			} // END Illegal name (empty string)
		} //END unmarshal message
	} // END For
} // END Run

func newTaskPath(message model.Message, client *Client) {
	// New Task recived, create and process
	newTask := model.NewTask(message.Name, message.Description)
	client.Pool.TasksList.AddTask(*newTask) // Concurrency issue?
	// State Updated write to DB
	database.Write(client.Pool.TasksList.Task_listToJSON())
	newMessage := model.WrapMessage(model.New_Task, newTask) // wrap in message object
	client.Pool.Broadcast <- *newMessage                     // Send to all connected browser windows
}

func updateTaskPath(message model.Message, client *Client) {
	// Update task state
	tsk, err := client.Pool.TasksList.GetTask(message.Name)
	if err != nil { // Problem
		fmt.Println(err.Error())
	} else { // OK
		tsk.ChangeState()
		// If finished. delete
		updateMessage := model.WrapMessage(model.Update_Task, tsk)
		// State Updated write to DB
		database.Write(client.Pool.TasksList.Task_listToJSON())
		client.Pool.Broadcast <- *updateMessage // Send to all connected browser windows
	}
}

func deleteTaskPath(message model.Message, client *Client) {
	// Update task state
	log.Println("Deleting Task: " + message.Name)
	log.Println(string(client.Pool.TasksList.Task_listToJSON()))

	tsk, err := client.Pool.TasksList.RemoveTask(message.Name)

	log.Println("Task deleted ")
	log.Println(string(client.Pool.TasksList.Task_listToJSON()))
	if err != nil { // Problem
		log.Println(err.Error())
	} else { // OK
		// If finished. delete
		deleteMessage := model.WrapMessage(model.Delete_Task, tsk)
		// State Updated write to DB
		database.Write(client.Pool.TasksList.Task_listToJSON()) // TODO: Something fail here!!!!!!
		client.Pool.Broadcast <- *deleteMessage                 // Send to all connected browser windows
	}
}
