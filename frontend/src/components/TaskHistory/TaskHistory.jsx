/* Task History (Task list) component
  Represents an ordered collection of task objects
  The the Name of a task is it's key
*/
import React, { Component } from "react";
import "./TaskHistory.css";
import Task from '../Task';
import { LocaleContext } from "../../locales/Translation";

class TaskHistory extends Component {

  render() {
    let locale = this.context;
    // Map the taskHistory prop to the tasks ellement
    const tasks = this.props.taskHistory.map(msg => 
      <Task key={msg.name} task = {msg} />)
      
    return (
      <div className="TaskHistory">
        <h2>{locale.TaskList}</h2>
        {tasks}
      </div>
    );
  }
}

TaskHistory.contextType = LocaleContext;

export default TaskHistory;
