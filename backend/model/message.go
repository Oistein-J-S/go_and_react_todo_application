/*
Model domain defining the structure of and capabilities of ellements in the domain.

This class provides the API to enable aditional functionality through a single point with a single message.
Primarily targeting the websocket layer since it does not have the flexibility of REST.
A websocket message will be in the form:
	Type int // Is it a Text or a Binary message
	Body string // Payload

This class supports functionality through the M_Type varriable.

#### Functionality: ####
Provide a message wraper structure
Support: creation, update and deletion of task
Create a new message
*/
package model

import (
	"encoding/json"
)

// Standard message wrapper for the application
type Message struct {
	M_Type      Message_Type `json:"m_type"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	IsFinished  bool         `json:"isFinished"`
}

// Message types
type Message_Type string

const (
	New_Task    = "New_Task"
	Update_Task = "Update_Task"
	Delete_Task = "Delete_Task"
)

/* Create a new message using input strings */
func NewMessage(tpe Message_Type, name string, description string, finished bool) *Message {
	var msg Message
	msg.M_Type = tpe
	msg.Name = name
	msg.Description = description
	msg.IsFinished = finished
	return &msg
}

/* Create a new message using a task */
func WrapMessage(tpe Message_Type, tsk *Task) *Message {
	var msg Message
	msg.M_Type = tpe
	msg.Name = tsk.Name
	msg.Description = tsk.Description
	msg.IsFinished = tsk.IsFinished
	return &msg
}

/* Return a byte[] with the JSON representation of the Message */
func (m Message) ToJSON() []byte {
	output, err := json.Marshal(m)
	if err != nil {
		return nil
	}
	return output
}
