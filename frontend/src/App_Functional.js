import React, { useEffect, useState } from "react";
import './App.css'; // Main site styling

// API for connection to Backend
import {connect} from "./api/webSocket";
import {Message_Type} from "./api/message";

// Import page ellements
import Header from './components/Header';
import TaskHistory from './components/TaskHistory';
import TaskInput from './components/TaskInput';

import Task from './components/Task';

//Import language support
import {languages, LocaleContext} from "./locales/Translation";

/* Application entrypoint */
function App () {
  const [taskState, setTaskState] = useState([]); // State Task storage

  // Aqire a webSocket connection to the backend and mapp the socket endpoint to application state
  useEffect( () => {
    console.log("Component did mount")
    connect( (inp) => { // Mapp message to function
      // unwrap input message to Object
      let tskObj = JSON.parse(inp.data)
      // m_type: New_Task
      if (tskObj.m_type === Message_Type.New_Task){ 
        if (hasTask(tskObj.name)) { // Fail if task exists
          console.log("ERROR: Recived task that allready exists")
        } else { // ok New Task
          // spread opperator: Coppy and append message object to state array
          setTaskState(prevState => ({ taskState: [...taskState, tskObj] }))
        }
      }
      // m_type: Update_Task
      else if (tskObj.m_type === Message_Type.Update_Task){
        let err = UpdateTask(tskObj.name)
        if (err){ alert(`____ALERT____\n Update failed!\n`) }
      }
      // m_type: Delete_Task
      else if (tskObj.m_type === Message_Type.Delete_Task){
        let err = DeleteTask(tskObj.name)
        if (err){ alert(`____ALERT____\n Failed to delete task!\n`) }
      }
      //m_type: fail
      else {
        alert(`____ALERT____\n Recived unknown message!\n ${tskObj} \n`)
      }
    });
    // This code works
    console.log("creating Task object list");
    const tasks = taskState.map(msg => 
      <Task key={msg.name} task = {msg} />);

    return function cleanup() { // clean at end of life
      console.log("Component unmounted")
    }
  });

  // Check if a task allready exists
  function hasTask(name){
    for (let tsk of taskState){
      if (tsk.name === name) { // Task found
        return true
      }
    }
    return false
  }

  // Change the state (isFinished) of a task
  function UpdateTask(name) {
    // find task and index
    for (let [i, tsk] of taskState.entries()){ 
      if (tsk.name === name) { // Task found
          let newTaskState = [...taskState] // copy imutable array
          newTaskState[i].isFinished = !tsk.isFinished // change ellement
          setTaskState(newTaskState) // Update State
        return false // Sucess, no error
      }
    }
    return true // Fail, return error
  }

  // update frontend state when a task has been deleted in the backend
  function DeleteTask(name) {
    // Create a new list containing all tasks that does not have name same as the deleted task
    var filteredlist = taskState.filter(task => task.name !== name)
    setTaskState({taskState : filteredlist}) // Repace the imutable array
  }
  // taskState={taskState}
  return (
    <div className="App">
      <LocaleContext.Provider value = {languages.no}>
        <Header />
        <TaskHistory 
          taskState={taskState} 
        /> 
        <TaskInput 
          onHasTask={hasTask}
        />
        </LocaleContext.Provider>
    </div>
  );
};

export default App;
