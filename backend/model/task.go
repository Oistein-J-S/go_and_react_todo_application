/*
Model domain defining the structure of and capabilities of ellements in the domain.

This structure defines a basic Task ellement

#### Functionality: ####
Create new tasks
pretty print
JSON conversions
*/
package model

import (
	"encoding/json"
	"errors"
	"fmt"
	"strconv"
)

/* Initsalization prompt */
func InitTask() {
	fmt.Println("Task model initialized")
}

/***************** Definitions *****************/

/* Task ellement model, the basic structure of our program. Defined by a sparse tree structure */
type Task struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	IsFinished  bool   `json:"isFinished"`
}

/***************** Implementations *****************/

/* Create a new task ellement  */
func NewTask(name string, description string) *Task {
	var task Task
	task.Name = name
	task.Description = description
	task.IsFinished = false
	return &task
}

/* Change the isFinished ellement and return the changed state  */
func (t *Task) ChangeState() bool {
	t.IsFinished = !t.IsFinished
	return t.IsFinished
}

/* Returns the content of the task in a string format for display */
func (t *Task) Display() string {
	return "Task name: " + t.Name + ", Description: " + t.Description
}

/* Returns the content of the task in a []byte format for file storage */
func (t *Task) Print() []byte {
	// extract task data
	output := []byte("Name:" + t.Name + "\n" + "Description:" + t.Description + "\n" + "IsFinished:" + strconv.FormatBool(t.IsFinished) + "\n")
	return output
}

/* Find a task given a simple list of tasks */
func FindTask(name string, tasks *[]Task) (*Task, error) {
	for _, t := range *tasks {
		if t.Name == name {
			return &t, nil
		}
	}
	return nil, errors.New("task not found")
}

/* Return a byte[] with the JSON representation of the object */
func (t Task) ToJSON() []byte {
	output, err := json.Marshal(t)
	if err != nil {
		return nil
	}
	return output
}
