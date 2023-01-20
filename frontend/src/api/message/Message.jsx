/* Message API 
    The message component. Frontend implementation of message.go
    The message class is used to implement functionality through the m_type varriable to create backend behaviour

	Message struct 
		M_Type      Message_Type `json:"m_type"`
		Name        string       `json:"name"`
		Description string       `json:"description"`
		IsFinished  bool         `json:"isFinished"`1)

1) the isFinished value is never read by the backend since it uses m_type and it's own state to figure out it's value
*/

/* Vallid Message types */
const Message_Type =  {New_Task: "New_Task", Update_Task: "Update_Task", Delete_Task: "Delete_Task"}

/* Create message struct to be used by the transport layer(websocket) */
let createMsg = (m_type, name, description, isFinished) => {
  return JSON.stringify({m_type, name, description, isFinished}) 
}

export {createMsg, Message_Type};
