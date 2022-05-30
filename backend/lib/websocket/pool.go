/*
Websocket domain holds functionality related to comunication and communication management

This class holds a pool of connected websocet clients
and supports managment of this pool

#### Functionality: ####
Registers new Clients and add them to the pool
Remove Clients from the pool (clients manages the timing)
Broadcast tasks to clients
*/
package websocket

import (
	"log"

	model "go_and_react_todo_application/backend/model"
)

// Current acctive connections
type Pool struct {
	Register   chan *Client
	Unregister chan *Client
	Clients    map[*Client]bool
	Broadcast  chan model.Message
	TasksList  *model.TaskList
}

// Create a new web socket pool
func NewPool() *Pool {
	return &Pool{
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Clients:    make(map[*Client]bool),
		Broadcast:  make(chan model.Message),
	}
}

func (pool *Pool) Start(input *model.TaskList) {
	pool.TasksList = input // aqire external data ad initzialisation

	for {
		select {
		case client := <-pool.Register:
			pool.Clients[client] = true
			log.Println("Client registerd, Size of Connection Pool: ", len(pool.Clients))

			// The new client must recive all stored tasks (Backend is the single source of truth)
			for _, tsk := range *pool.TasksList.GetTasks() {
				// wrap in message
				newMessage := model.WrapMessage(model.New_Task, &tsk)
				log.Println(string(newMessage.ToJSON()))
				client.Conn.WriteJSON(newMessage)
			}

		case client := <-pool.Unregister:
			delete(pool.Clients, client)
			log.Println("Client Unregisterd, Size of Connection Pool: ", len(pool.Clients))

		case msg := <-pool.Broadcast:
			//Logg
			log.Println("Sending update to all clients in Pool")
			// distibute message to clients
			for client := range pool.Clients {
				err := client.Conn.WriteJSON(msg)
				if err != nil {
					log.Print("Error: ")
					log.Println(err)
					return
				}
			}
		}
	}
}
