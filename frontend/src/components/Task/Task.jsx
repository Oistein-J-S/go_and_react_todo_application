/* Task component
  Represents a task object
  Name, description and isFinished
  Functionality: handles updates to this task (self)
*/
import React from "react";
import "./Task.css";

// Backend WebSocket API for connection
import { sendMsg } from "../../api/webSocket";
import {createMsg, Message_Type} from "../../api/message";
// Language support
import { LocaleContext } from "../../locales/Translation";

function Task(props){  
  // Language support
  let locale = React.useContext(LocaleContext);

  /*Send event content to WebSocket endpoint 
    Uppdate happens through backend repply 
    Delete tasks that have been completed  
  */
  const updateTask = () => {
    // Create message of type update task
    let msg = createMsg(Message_Type.Delete_Task, props.task.name, props.task.description); 
    // Send message content to WebSocket endpoint
    sendMsg(msg); 
  }

  /*Task div, with a name and a desription and 
  a button to send a delete request to the backend*/
  return (
    <div className = "Task" >
      {locale.Name}: {props.task.name},  
      {" " + locale.Description}: {props.task.description} 
      <div class = "divider" />
      <button type = "button" 
        name = {props.task.name} 
        onClick = {updateTask}
        > Delete
      </button>
    </div>
  );
};

export default Task;