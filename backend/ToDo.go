/* A ToDo application.
This class represents the application entry point.
This class creates and settups the applications functions.
*/
package main

import (
	"fmt"

	database "go_and_react_todo_application/backend/lib/database"
	model "go_and_react_todo_application/backend/model"
	view "go_and_react_todo_application/backend/views"
)

// Program entry point
func main() {
	/* package initialisation */
	model.InitTask()
	model.InitTaskList()
	database.InitDB("") // use default file values

	/* Test ellements deffinition and settup */
	//testList := model.NewList()
	//database.GetTaskList(testList)
	//database.StoreData() // Reset DB

	fmt.Print("\n --------------- Start IO --------------- \n")
	dBList := model.NewList()
	dBList.AddTaskList(database.ReadTasks())

	fmt.Print("\n --------------- Start Websockets --------------- \n")
	//view.RunWebSocket(testList) // Send hardcoded test data
	view.RunWebSocket(dBList)
}
