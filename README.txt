This is a project I have used to learn GO and React. Websockets were also a nice adition I hve no previous experience with.
The basic design is a backend holding the application state and functionality.
Coupled with a front end displaying that state. 
The system should be OS agnostic. 

/************************* Requirements ****************************************/
Node
NPM
react

* The application has been tested in windos 10 and WSL2

/************************* Genneral overwiew of the application ****************/
Backend writen in go with a react frontend. 
The application is a todo list with a central backend serving a number discrete browser windows.
All connected views should see the same content.

Functionality:
Create task and task description.
Mark tasks as completed. (delete task)

/************************* Backend *********************************************/

Behaviour:
The backend should support multiple frontends.
The backend should the single source of truth(single datasource).
Uppdates to the backend should be refected in all conected frontend views.
Finished tasks should be removed after some time has lapsed.
The list should be stored on disk for persistance (simple DB).

/************************* Frontend ********************************************/

Behaviour:
The frontend recives it's state from the backend.
The frontend displays the recived state.
The frontend should not update itself but request updates from the backend.