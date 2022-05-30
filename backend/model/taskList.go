/*
Model domain defining the structure of and capabilities of ellements in the domain.

This class represents a collection of tasks
and supports management of this collection

#### Functionality: ####
A collection of Task ellements
Creation of new lists
Member manipulation: add, remove, search
*/
package model

import (
	"encoding/json"
	"errors"
	"log"
)

/* Initsalization prompt */
func InitTaskList() {
	log.Println("Task_list model initialized")
}

/***************** Definitions *****************/
type TaskList struct {
	tasks []Task
}

/***************** Implementations *****************/
func NewList() *TaskList {
	var taskList TaskList
	return &taskList
}

/* Add a single task to the task list*/
func (list *TaskList) AddTask(task Task) {
	list.tasks = append(list.tasks, task)
}

/* Add a list of task to the task list */
func (list *TaskList) AddTaskList(tsks []Task) {
	list.tasks = append(list.tasks, tsks...)
}

/* Delete the task with the same name as the provided Task */
func (list *TaskList) Delete(task Task) bool {
	for i, t := range list.tasks { // Search for task
		if t.Name == task.Name { // Found the ellement
			for n := i; n < (len(list.tasks) - 1); n++ { // Keep list order
				t = list.tasks[n+1] // replace with next until end
			}
			return true
		}
	}
	return false
}

/* Get the task with the name provided. */
func (list *TaskList) GetTask(name string) (*Task, error) {
	for i, t := range list.tasks { // Search for task
		if t.Name == name { // Found the ellement

			return &list.tasks[i], nil
			//return &t
		}
	}
	return nil, errors.New("No task found with ID: " + name) // Found no task
}

/* Remove the task with the name provided. */
func (list *TaskList) RemoveTask(name string) (*Task, error) {
	for i, t := range list.tasks { // Search for task
		if t.Name == name { // Found the ellement
			tsk := t // should coppy
			newlist := append(list.tasks[:i], list.tasks[i+1:]...)
			list.tasks = newlist // should leave the old list free to be deleted
			return &tsk, nil
		}
	}
	return nil, errors.New("No task found with ID: " + name) // Found no task
}

/* Return a pointer to the list of tasks */
func (list TaskList) GetTasks() *[]Task {
	return &list.tasks
}

/* Return a JSON representation of the contained list of tasks */
func (list TaskList) Task_listToJSON() []byte {
	output, err := json.Marshal(list.GetTasks())
	if err != nil {
		return nil
	}
	return output
}
