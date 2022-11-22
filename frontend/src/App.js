import React, { Component } from "react";
import './App.css'; // Main site styling

// API for connection to Backend
import {connect} from "./api/webSocket";
import {Message_Type} from "./api/message";

// Import page ellements
import Header from './components/Header';
import TaskHistory from './components/TaskHistory';
import TaskInput from './components/TaskInput';

// Import language ellements
//import {UpdateTranslation} from "./locales/Translation";

/* Application entrypoint */
class App extends Component {
  constructor(props) {
    super(props);
      this.state = {taskHistory: []} // State Task storage
      this.hasTask = this.hasTask.bind(this) // Bind ellement to application context?
  }

  /* Aqire a webSocket connection to the backend
  Mapp the socket endpoint to application state
  Import the current backend state */
  componentDidMount() {
    console.log("Component did mount")
    // Mapp the websocket connection to update state when reciving a message
    connect( // WS Connection
      (inp) => { // Mapp message to function
      // unwrap to message
      let tskmsg = JSON.parse(inp.data)
      // m_type: New_Task
      if (tskmsg.m_type === Message_Type.New_Task){ 
        if (this.hasTask(tskmsg.name)) { // If task exists
          // Fail
          console.log("ERROR: Recived task that allready exists")
        } else { // ok New Task
          this.setState(prevState => ({ 
          //this.setState({      
            taskHistory: [...this.state.taskHistory, tskmsg]
            /* spread opperator: Coppy and append */   
          }))
        }
      } 
      // m_type: Update_Task
      else if (tskmsg.m_type === Message_Type.Update_Task){
        let err = this.UpdateTask(tskmsg.name)
        if (err){ 
          alert(`____ALERT____\n
          Update failed!\n`)  
        }
      }
      // m_type: Delete_Task
      else if (tskmsg.m_type === Message_Type.Delete_Task){
        let err = this.DeleteTask(tskmsg.name)
        if (err){ 
          alert(`____ALERT____\n
          Failed to delete task!\n`)  
        }
      }
      //m_type: fail
      else {
        alert(`____ALERT____\n
        Recived unknown message!\n
        ${tskmsg} \n`)  
      }
    });
  }

  // Check if a task allready exists
  hasTask(name) {
    for (let tsk of this.state.taskHistory){ // this.state.taskHistory
      if (tsk.name === name) { // Task found
        return true
      }
    }
    return false
  }

  // Change the state (isFinished) of a task
  UpdateTask(name) {
    // find task and index
    for (let [i, tsk] of this.state.taskHistory.entries()){ 
      if (tsk.name === name) { // Task found
          let newTaskHistory = [...this.state.taskHistory] // copy imutable array
          newTaskHistory[i].isFinished = !tsk.isFinished // change ellement
          this.setState(newTaskHistory) // Update State
        return false // Change sucessfull, no error   
      }
    }
    return true // Failure, return error bool
  }

  // Delet a task because it has been removed in the backend
  // Trivial sulution is a page refresh
  DeleteTask(name) {
    // Create a new list containing all tasks that does not have name same as the deleted task
    var filteredlist = this.state.taskHistory.filter(task => task.name !== name)
    this.setState({taskHistory : filteredlist}) // Update State
  }

  render() {
    return (
      <div className="App">
        <Header />
        <TaskHistory taskHistory={this.state.taskHistory} />
        <TaskInput 
          onHasTask={this.hasTask} // Weird react shit https://reactjs.org/docs/thinking-in-react.html
        />
      </div>
    );
  }
}

export default App;
