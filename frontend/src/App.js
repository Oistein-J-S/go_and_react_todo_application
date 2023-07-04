import React, { useEffect, useState } from "react";

import './App.css'; // Main site styling

// API for connection to Backend
import {connect} from "./api/webSocket";
import {Message_Type} from "./api/message";

// Import page ellements
import Header from './components/Header';
import TaskHistory from './components/TaskHistory';
import TaskInput from './components/TaskInput';

//Import language support
import {languages, LocaleContext} from "./locales/Translation";

/* Application entrypoint */
function App() {
  const [taskHistory, setTaskHistory] = useState([]);

/*
class App extends React.Component {
  constructor(props) {
    super(props);
      this.state = {taskHistory: []} // State Task storage
      this.hasTask = this.hasTask.bind(this) // Bind ellement to application context?
  };
*/

  /* Aqire a webSocket connection to the backend
  Mapp the socket endpoint to application state
  Import the current backend state */
  //const componentDidMount = () => {
  useEffect( () => {
    console.log("Component did mount")
    // Mapp the websocket connection to update state when reciving a message
    connect( // WS Connection
      (inp) => { // Mapp message to function
      // unwrap to message
      let tskmsg = JSON.parse(inp.data)
      // m_type: New_Task
      if (tskmsg.m_type === Message_Type.New_Task){ 
        if (/*this.hasTask(tskmsg.name)*/ hasTask(tskmsg.name) ) { // If task exists
          // Fail
          console.log("ERROR: Recived task that allready exists")
        } else { // ok New Task
          //console.log("OK: Recived task: " + tskmsg)
          //this.setState(prevState => ({ 
            //taskHistory: [...this.state.taskHistory, tskmsg]  
          //setTaskHistory( () => ({ 
            //taskHistory: [...taskHistory, tskmsg]
            setTaskHistory(taskHistory.push(tskmsg));
            /* spread opperator: Coppy and append */   
          //}))
        }
      } 
      // m_type: Update_Task
      else if (tskmsg.m_type === Message_Type.Update_Task){
        //let err = this.UpdateTask(tskmsg.name)
        let err = UpdateTask(tskmsg.name)
        if (err){ 
          alert(`____ALERT____\n
          Update failed!\n`)  
        }
      }
      // m_type: Delete_Task
      else if (tskmsg.m_type === Message_Type.Delete_Task){
        //let err = this.DeleteTask(tskmsg.name)
        let err = DeleteTask(tskmsg.name)
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
    
    return function cleanup() {
      console.log("component unmounted")
    };
  });

  // Check if a task allready exists
  const hasTask = (name) => {
    //for (let tsk of this.state.taskHistory){ // this.state.taskHistory
    for (let tsk of taskHistory){ // this.state.taskHistory
      if (tsk.name === name) { // Task found
        return true
      }
    }
    return false
  }

  // Change the state (isFinished) of a task
  const UpdateTask = (name) => {
    // find task and index
    //for (let [i, tsk] of this.state.taskHistory.entries()){ 
      for (let [i, tsk] of taskHistory.entries()){ 
      if (tsk.name === name) { // Task found
          //let newTaskHistory = [...this.state.taskHistory] // copy imutable array
          let newTaskHistory = [...taskHistory] // copy imutable array
          newTaskHistory[i].isFinished = !tsk.isFinished // change ellement
          //this.setState(newTaskHistory) // Update State
          setTaskHistory(newTaskHistory) // Update State
        return false // Change sucessfull, no error   
      }
    }
    return true // Failure, return error bool
  }

  // Delet a task because it has been removed in the backend
  // Trivial sulution is a page refresh
  const DeleteTask = (name) => {
    // Create a new list containing all tasks that does not have name same as the deleted task
    //var filteredlist = this.state.taskHistory.filter(task => task.name !== name)
    //this.setState({taskHistory : filteredlist}) // Update State
    var filteredlist = taskHistory.filter(task => task.name !== name)
    setTaskHistory({taskHistory : filteredlist}) // Update State
  }

 // render() {
    return (
      <div className="App">
        <LocaleContext.Provider value = {languages.no}>
          <Header />
          <TaskHistory taskHistory={taskHistory} /* taskHistory={this.state.taskHistory} */ />
          <TaskInput 
            onHasTask={/*this.hasTask*/ hasTask} // https://reactjs.org/docs/thinking-in-react.html
          />
          </LocaleContext.Provider>
      </div>
    );
  //}
}

export default App;
