# About:
The backend writen in go with a websocket connection to the frontend. 
The application represents a todo list.
The backend orchestrates changes in the frontend.
There should be a number of discrete connections.
All connected views sees the same content.

# Functionality
Create a task.
Mark a tasks as completed
Delete a task
Store tasks in some db

# Behaviour
The backend should support multiple frontends.
The backend should the single source of truth(single datasource).
Uppdates to the backend should be refected in all conected frontend views.
Finished tasks should be removed after some time has lapsed
The list should be stored on disk for 

# Usage

In the backend folder:
### `go run ./`
Compiles and runs the application
### `go build`
Compiles the application

**Note: Chec out https://go.dev/doc/cmd for more command options!**