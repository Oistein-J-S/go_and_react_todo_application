/* Task History (Task list) component
  Represents an ordered collection of task objects
  The the Name of a task is it's key
*/
import React, { Component } from "react";
import "./TaskHistory.css";
import Task from '../Task';
import {TaskList} from "../../locales/Translation";

class TaskHistory extends Component {

  render() {
    // Map the taskHistory prop to the tasks ellement
    const tasks = this.props.taskHistory.map(msg => 
      <Task key={msg.name} task = {msg} />)
      
    return (
      <div className="TaskHistory">
        <h2>{TaskList}</h2>
        {tasks}
      </div>
    );
  }
}

export default TaskHistory;

/*
return (
  <div className="TaskHistory">
    <h2>Task History</h2>
    {tasks}
  </div>
);
*/