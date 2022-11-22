/* 
All ellements in the page and their translations.
To extend: add a set off translations and a language

Concept
Ellement
Key -> translatio en -> translation no -> translation fr .......
*/

// Languages
const Languages = {
    //Name: Symbol("ellement")
    en: Symbol("en"),
    no: Symbol("no")};

// Definition and default value
//var Language = Languages.en;
var Language = Languages.no;

// ------ Ellements --------
// Default is english TODO: 2 instances of englis is currently used. Merge.
//var Heading = "ToDo Application"; 
var Heading = "Gjøremåls Applikasjon" 
//var TaskList = "Task List"
var TaskList = "Gjøremål"
//var Name = "Name"
var Name = "Navn"
//var Description = "Description"
var Description = "Beskrivelse"
//var NewTask = "New Task"
var NewTask = "Nytt Gjøremål"
//var CreateNewTask = "Create New Task"
var CreateNewTask = "Opprett Nytt Gjøremål"

// Translations
function UpdateTranslation(){
    // Norwegian
    if (Language === Languages.no){
        Heading = "Gjøremåls Applikasjon" 
        TaskList = "Gjøremål"
        Name = "Navn"
        Description = "Beskrivelse"
        NewTask = "Nytt Gjøremål"
        CreateNewTask = "Opprett Nytt Gjøremål"

    // English default
    } else { // Revert to default if lang is not recognised
        Heading = "ToDo Application" // OK
        TaskList = "Tasks" // OK
        Name = "Name"
        Description = "Description"
        NewTask = "New Task"
        CreateNewTask = "Create New Task"
     }
}

// -------- Exports  -------- 
export {UpdateTranslation, Heading, TaskList, Name, Description, NewTask, CreateNewTask};
// file pos "/src/components/locales/Translation"