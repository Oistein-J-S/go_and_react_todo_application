/* Task component
  Represents a task object
  Name, description and isFinished
  Functionality to request an update to this task
*/

import React, { Component } from "react";
import "./Task.css";

// Backend WebSocket API for connection
import { sendMsg } from "../../api/webSocket";
import {createMsg, Message_Type} from "../../api/message";
import { LocaleContext } from "../../locales/Translation";

class Task extends Component {
  constructor(props) {
    super(props);
      this.updateTask = this.updateTask.bind(this)
  } 

  /*Send event content to WebSocket endpoint 
    Uppdate happens through backend repply 
    Delete tasks that have been completed  
  */
  updateTask(){
    // Create message of type update task
    //let msg = createMsg(Message_Type.Update_Task, this.props.task.name, this.props.task.description); 
    // Create message of type delete task (delete on update isFinished)
    let msg = createMsg(Message_Type.Delete_Task, this.props.task.name, this.props.task.description); 
    // Send message content to WebSocket endpoint
    sendMsg(msg); 
  }

  render() {
    let locale = this.context;
    return <div className = "Task" >
        {locale.Name}: {this.props.task.name},  
        {" " + locale.Description}: {this.props.task.description} 
        <div class = "divider" />
        <button type = "button" 
          name = {this.props.task.name} 
          onClick = {this.updateTask}
        > Delete
        </button>
      </div>;
  }
}

Task.contextType = LocaleContext;

export default Task;