/* Task Input component
  Represents functionality (input fields and methods) to create a new task
  Will not alter the state but just send a request for a new task to be added to the backend
  The update will happen when the backend sends an update request to all connected clients
*/

import React, { Component } from "react";
import "./TaskInput.css";

// Backend WebSocket API for connection
import {sendMsg} from "../../api/webSocket";
import {createMsg, Message_Type} from "../../api/message";

// Language
import { LocaleContext } from "../../locales/Translation";

class TaskInput extends Component {
  constructor(props){
    super(props)
    this.state = {name: '', description: ''} // Temporary storage of input for handleChange
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.hasTask = this.hasTask.bind(this) // Bind ellement from App to application context?
  }
  
  // Store values of input field in state
  handleChange(event){
    this.setState({[event.target.id] : event.target.value})
  }

  hasTask(name) { // Redefine the function (because React?)
    return this.props.onHasTask(name); // Callback to APP DOM moddel pass down
  }

  // Form submitting logic, prevent default page refresh
  handleSubmit(event){
    if (this.state.name === '') {
      // Test failed, allert user
      alert(`____ALERT____\n
      Task must have a name!\n
      Please choose a name\n`)
    // No state reset allows the user to rectify issue
    }
    else if (this.props.onHasTask(this.state.name)){
      // Test failed, allert user
      alert(`____ALERT____\n
        Task allready exists!\n
        Please choose different name\n`)
      // No state reset allows the user to rectify issue
    } 
    else { // OK continue
      // Create message of type new task
      let msg = createMsg(Message_Type.New_Task, this.state.name, this.state.description)
      // Send message content to WebSocket endpoint
      sendMsg(msg);
      // Reset input fields
      this.setState({ name: '', description: ''})
    }
    // Prevent page refresh
    event.preventDefault() 
  }

  render() {
    let locale = this.context;
    return (
    <form className="TaskInput" onSubmit={this.handleSubmit}>
        <h5>{locale.NewTask}</h5>
        <label htmlFor='name'>{locale.Name}: </label> 
        <input
          id='name'
          placeholder={locale.Name}
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor='description'>{locale.Description}:</label> <br></br>
        <textarea
            id='description'
            placeholder={locale.Description}
            value={this.state.description}
            onChange={this.handleChange}
          /><br></br>
        <button type="submit">{locale.CreateNewTask}</button>
      </form>
    ); // End form
  } // End render
} // End class

TaskInput.contextType = LocaleContext;

export default TaskInput;

/* Shows the state as it is being updated
<h5>New Task</h5>
<div>Name: {this.state.name}, Description: {this.state.description} </div> 
<label htmlFor='name'>Name: </label>
*/