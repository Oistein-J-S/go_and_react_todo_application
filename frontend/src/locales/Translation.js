/* 
All ellements in the page and their translations.
To extend: add a set off translations to the varriable sett
*/
import React from "react";

// locales
export const languages = {
    // Norwegian
    no: {
        Heading: "Gjøremåls Applikasjon",
        TaskList: "Gjøremål",
        Name: "Navn",
        Description: "Beskrivelse",
        NewTask: "Nytt Gjøremål",
        CreateNewTask: "Opprett Nytt Gjøremål"
        // TODO: Alerts: Update Failed, Failed to delete task, Recived unknown message, Task must have a name, Task allready exists
    }, 
    // English
    en: {
        Heading: "ToDo Application",
        TaskList: "Tasks",
        Name: "Name",
        Description: "Description",
        NewTask: "New Task",
        CreateNewTask: "Create New Task"
        // TODO: Alerts: Update Failed, Failed to delete task, Recived unknown message, Task must have a name, Task allready exists
    }
}; 

/*
export const LocaleContext = React.createContext({
    locale: languages.no,
    changeLocale: () => {},
}); // Default vaule
*/
export const LocaleContext = React.createContext(languages.en); // Default vaule
//export const LocaleContext = React.createContext(null); // No default vaule

// -------- Exports  -------- 
//export {languages, LocaleContext};