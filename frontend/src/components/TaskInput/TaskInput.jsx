/* Task Input component
  Represents functionality (input fields and methods) to create a new task
  Will not alter the state but just send a request for a new task to be added to the backend
  The update will happen when the backend sends an update request to all connected clients
*/

import React, { useState } from "react";
import "./TaskInput.css";

// Backend WebSocket API for connection
import {sendMsg} from "../../api/webSocket";
import {createMsg, Message_Type} from "../../api/message";
// Language
import { LocaleContext } from "../../locales/Translation";

function TaskInput(props) {
  // Language support
  let locale = React.useContext(LocaleContext);

  // Temporary storage of input for handleChange
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  // Store values of input field in state
  const handleChange = (event) =>{
    if (event.target.id === 'name') setName(event.target.value);
    else if (event.target.id === 'description') setDescription(event.target.value);
  }

  const hasTask = (name) => { // Redefine the function (because React?)
    return props.onHasTask(name); // Callback to APP DOM moddel pass down
  }

  // Form submitting logic, prevent default page refresh
  const handleSubmit = (event) => {
    if (name === '' || name === undefined || name === null ) {
      // Test failed, allert user
      alert(`____ALERT____\n
      Task must have a name!\n
      Invallid name\n`)
      // No state reset allows the user to rectify issue
    } else if (hasTask(name)) { // Test failed, allert user
      alert(`____ALERT____\n
      Task allready exists!\n 
      Please choose different name\n`)
    }
    else if ( name !== null || name !== undefined || description !== null || description !== undefined) { // OK continue
      let msg = createMsg(Message_Type.New_Task, name, description);
      sendMsg(msg);
      setName('');
      setDescription('');
    } else { // Something went wrong,
      console.log(`Error: TaskInput.jsx->handleSubmit() name: ${name} description: ${description}`);
    }

    event.preventDefault() 
  }

  return (
    <form className="TaskInput" onSubmit={handleSubmit}>
      <h5>{locale.NewTask}</h5>
      <label htmlFor='name'>{locale.Name}: </label> 
      <input
        id='name'
        placeholder={locale.Name}
        required
        value={name}
        onChange={handleChange}
      />
      <label htmlFor='description'>{locale.Description}:</label> <br></br>
      <textarea
        id='description'
        placeholder={locale.Description}
        value={description}
        onChange={handleChange}
      />
      <br></br>
      <button type="submit">{locale.CreateNewTask}</button>
    </form>
  ); // End return
} // End class

export default TaskInput;