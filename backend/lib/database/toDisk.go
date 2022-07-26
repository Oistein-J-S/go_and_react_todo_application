/*
Class supporting simple functionality for storing data to disk for data persistence

https://pkg.go.dev/os

#### Functionality: ####
Init class (create db connection())
	Make sure the file exists but do not modify content

Store all data (This should overwrite existing data)
Read all data -> read some data

#### Notes to future self: ####
Current file acess is directly from code through os.
This has unknown behaviour and risks concurrency issues(may be safe, maybe not).

Consider the use of ioutil. Might give neater code.
*/
package database

import (
	"encoding/json"
	"log"
	"os"

	model "go_and_react_todo_application/backend/model"
)

/* File varriables */
const filePos = "lib/database/"

var fileName = "ToDoList.txt" // Default filename
var filePath = filePos + fileName

/* Initialization function.
Make certain that a readable file exists and returns it's content if anny
For default filename use "" */
func InitDB(fName string) []byte {
	// Create filename
	if fName != "" {
		log.Println("Recived new file name" + fName)
		fileName = fName + ".txt"     // Update name
		filePath = filePos + fileName // uppdate complete filepath
	}
	// File Initialization (Create if missing)
	file, err := os.OpenFile(filePath, os.O_RDONLY|os.O_CREATE, 0755)
	check(err)
	file.Close() // Know the file exists. Release for read opperation

	// Read the entire file content
	bytes, err2 := os.ReadFile(filePath)
	check(err2)
	log.Println("I/O initialized")

	return bytes
}

// Get the path to the storrage possition
func GetFileName() string {
	return fileName
}

/* Input should be a JSON string
All data should be in memmory. Overwrite with changes. */
func Write(data []byte) {
	log.Println("Write action start")
	file, err := os.OpenFile(filePath, os.O_RDWR|os.O_CREATE|os.O_TRUNC, 0755)
	check(err)
	log.Println("File Opened")
	_, err2 := file.Write(data)
	check(err2)
	file.Sync() // wait for action to complete
	file.Close()
	log.Println("Write Action complete")
}

// Aquire data from disk
func Read() []byte {
	log.Println("Reading file: " + fileName)
	bytes, err := os.ReadFile(filePath)
	check(err)
	log.Println("Reading complete")
	return bytes
}

// Aquire data from disk as tasks (this function should brobably not return a set of tasks but just a set of bytes)
func ReadTasks() []model.Task {
	state := Read() // Extract previous state from db
	log.Println("Got state from db: " + string(state))
	var tasks []model.Task // New empty list
	// if file is empty unmarahal will throw an error
	if len(state) != 0 {
		err := json.Unmarshal(state, &tasks)
		check(err)
	} else { // File did not even contain an empty list
		// Allready have an empty list, logg and move on
		//log.Println("Error: db file contained no empty list")
		log.Println("Error: db file contained no readable data. Continuing without.")
		// Could write an empty list to file, but the db should be self healing beyond this
	}

	return tasks
}

/* Helper function for cleaner code */
func check(e error) {
	if e != nil {
		log.Fatal(e)
	}
}
