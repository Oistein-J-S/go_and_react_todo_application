//import React, { useState } from "react";
import React from "react";
import './App.css';

// API for connection to Backend
import {connect} from "./api/webSocket";
import {Message_Type} from "./api/message";

// Import page ellements
import Header from './components/Header';
import TaskHistory from './components/TaskHistory';
import TaskInput from './components/TaskInput';

//Import language support
import {languages, LocaleContext} from "./locales/Translation";

// Application entrypoint
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {taskState: []} // State Task storage
      this.hasTask = this.hasTask.bind(this) // Bind ellement to application context?
  };

  // Aqire a webSocket connection to the backend and mapp the socket endpoint to application state
  componentDidMount() {
    console.log("Component did mount")
    connect((inp) => { // Mapp message to function
      // unwrap to message
      let tskmsg = JSON.parse(inp.data)
      // m_type: New_Task
      if (tskmsg.m_type === Message_Type.New_Task){ 
        if (this.hasTask(tskmsg.name)) { // Fail if task exists
          console.log("ERROR: Recived task that allready exists")
        } else { // ok New Task
          this.setState(prevState => ({ 
            taskState: [...this.state.taskState, tskmsg]
            // spread opperator: Coppy and append
          }))
        }
      } 
      // m_type: Update_Task
      else if (tskmsg.m_type === Message_Type.Update_Task){
        let err = this.UpdateTask(tskmsg.name)
        if (err){ 
          alert(`____ALERT____\n Update failed!\n`)  
        }
      }
      // m_type: Delete_Task
      else if (tskmsg.m_type === Message_Type.Delete_Task){
        let err = this.DeleteTask(tskmsg.name)
        if (err){ 
          alert(`____ALERT____\n Failed to delete task!\n`)  
        }
      }
      //m_type: fail
      else {
        alert(`____ALERT____\n Recived unknown message!\n
        ${tskmsg} \n`)  
      }
    });
  }

  // Check if a task allready exists
  hasTask(name) {
    for (let tsk of this.state.taskState){
      if (tsk.name === name) { // Task found
        return true
      }
    }
    return false
  }

  // Change the state (isFinished) of a task
  UpdateTask(name) {
    // find task and index
    for (let [i, tsk] of this.state.taskState.entries()){ 
      if (tsk.name === name) { // Task found
          let newTaskState = [...this.state.taskState] // copy imutable array
          newTaskState[i].isFinished = !tsk.isFinished // change ellement
          this.setState(newTaskState) // Update State
        return false // Sucess, no error   
      }
    }
    return true // Fail, return error
  }

  // update frontend state when a task has been deleted in the backend
  DeleteTask(name) {
    // Create a new list containing all tasks that does not have name same as the deleted task
    var filteredlist = this.state.taskState.filter(task => task.name !== name)
    this.setState({taskState : filteredlist}) // Repace the imutable array
  }

  render() {
    return (
      <div className="App">
        <LocaleContext.Provider value = {languages.no}>
          <Header />
          <TaskHistory taskState={this.state.taskState} />
          <TaskInput 
            onHasTask={this.hasTask} // https://reactjs.org/docs/thinking-in-react.html
          />
          </LocaleContext.Provider>
      </div>
    );
  }
}

export default App;
