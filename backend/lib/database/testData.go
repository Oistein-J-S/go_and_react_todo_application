/*
Hardcoded data for testing

#### Functionality: ####
Return a list of tasks
Return the tasks in a task_list
Seed the db with some test data
*/
package database

import (
	"encoding/json"
	"log"

	model "go_and_react_todo_application/backend/model"
)

/* Aquire some hardcoded test data */
func GetData(slice *[]model.Task) {
	// Some tasks
	*slice = append(*slice, *model.NewTask("task1", "first task"))
	*slice = append(*slice, *model.NewTask("task2", "second task"))
	*slice = append(*slice, *model.NewTask("task3", "third task"))
	*slice = append(*slice, *model.NewTask("task4", "fourth task"))
	// (*slice)[3].ChangeState() // Set task to finished
}

/* Aquire some hardcoded test data */
func GetTaskList(lst *model.TaskList) {
	// Test ellements deffinition and settup
	baseList := make([]model.Task, 0)
	GetData(&baseList) // Test data
	// Add all hardcoded data to list
	lst.AddTaskList(baseList)
}

/* Put some hardcoded test data in to the db */
func StoreData() {
	testList := model.NewList()
	state, err := json.Marshal(testList.GetTasks())
	if err != nil {
		log.Fatal(err)
	}
	Write(state)
}

/* Aquire some hardcoded test data as a JSON string */
func GetDataAsJSON() string {
	return "[{\"Name\":\"task1\",\"Description\":\"first task\",\"IsFinished\":false,\"Subtasks\":[{\"Name\":\"subtask1 task1\",\"Description\":\"first subtask of task1\",\"IsFinished\":false,\"Subtasks\":null},{\"Name\":\"subtask2 task1\",\"Description\":\"second subtask of task1\",\"IsFinished\":false,\"Subtasks\":null}]},{\"Name\":\"task2\",\"Description\":\"second task\",\"IsFinished\":false,\"Subtasks\":null},{\"Name\":\"task3\",\"Description\":\"third task\",\"IsFinished\":false,\"Subtasks\":[{\"Name\":\"subtask task3\",\"Description\":\"first subtask of task3\",\"IsFinished\":false,\"Subtasks\":[{\"Name\":\"sub subtask1 task3\",\"Description\":\"first subtask of task3\",\"IsFinished\":false,\"Subtasks\":null},{\"Name\":\"sub subtask2 task3\",\"Description\":\"second subtask of task3\",\"IsFinished\":false,\"Subtasks\":null},{\"Name\":\"sub subtask3 task3\",\"Description\":\"third subtask of task3\",\"IsFinished\":false,\"Subtasks\":null}]}]"
}
