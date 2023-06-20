/* Task History (Task list) component
  Represents an ordered collection of task objects
  The the Name of a task is it's key
*/
import React from "react";
import "./TaskHistory.css";
import Task from '../Task';
import { LocaleContext } from "../../locales/Translation";

function TaskHistory(props) {
  // Language support
  let locale = React.useContext(LocaleContext);
  
  // Map the taskHistory prop to the tasks ellement
  const tasks = props.taskHistory.map(msg => 
    <Task key={msg.name} task = {msg} />);
      
  return (
    <div className="TaskHistory">
      <h2>{locale.TaskList}</h2>
      {tasks}
    </div>
  );
}; // End of TaskHistory component

export default TaskHistory;
